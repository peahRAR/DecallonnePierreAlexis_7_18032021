// Imports
const models = require('../models');

function pathOfFile(req) {
    if (req.file != undefined) {
        return attachement = `public/images/${req.file.filename}`;
    }
}

// Routes
module.exports = {

    // CREATE
    createMessage: function (req, res) {
        // Params
        let content = req.body.content;
        let userId = req.user.id;
        let tags = req.body.tags;
        let idParent = req.body.idParent;

        if (req.fileValidationError) {
            return res.end(req.fileValidationError);
        }

        // Verification que le content ne soit pas null
        if (content == null) {
            return res.status(400).json({ 'error': 'need content' });
        }
        const message = models.Message.build({
            content,
            UserId: userId,
            tags,
            attachement: pathOfFile(req),
            idParent
        });
        message.save()
            .then(() => {
                res.status(201).json({ message: 'published message' })
            })
            .catch((error) => {
                res.status(400).json({ error })
            })
    },

    // READ
    listMessage: function (req, res) {
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        }).then(function (messages) {
            if (messages) {
                res.status(200).json(messages.map(message => {
                    let nbDislike = 0;
                    let nbLike = 0;
                    message.Users.forEach(element => {
                        switch (element.Like.isLike) {
                            case 0:
                                nbDislike += 1
                                break;

                            case 1:
                                nbLike += 1
                                break;

                            default:
                                break;
                        }
                    });
                    return {
                        id: message.id,
                        content: message.content,
                        attachement: message.attachement,
                        tag: message.tags,
                        createAt: message.createAt,
                        updatedAt: message.updatedAt,
                        user: message.Users[0].username,
                        // Compteur like & Dislike
                        advices: {
                            nbLike: nbLike,
                            nbDislike: nbDislike
                        }
                    }
                }))
            } else {
                res.status(404).json({ "error": "No message found" });
            }
        }).catch(function (err) {
            console.log(err)
            res.status(500).json({ "error": "invalid fields" });
        })
    },

    // UPDATE
    modifyMessage: async function (req, res) {
        try {
            console.log('log  ==> ' + req.body.content)
            const message = await models.Message.findOne({ where: { "id": req.params.id } });
            if (!message) {
                res.status(404).json({ "error": "Message introuvable" })
            }

            let attachement = pathOfFile(req);

            message.content = req.body.content;
            message.tags = req.body.tags;
            message.attachement = attachement;

            await message.save()
                .then(() => {
                    res.status(201).json({ message: 'modified message' })
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ error })
                })

        } catch (error) {
            console.log(error);
        }

    },

    // DELETE
    deleteMessage: function (req, res) {
        let id = req.params.id;
        models.Message.destroy({
            where: { id: id }
        }).then(() => {
            res.sendStatus(204);
        }).catch(function (err) {
            console.log(err);
            res.status((500)).json({ 'error': 'cannot delete this message' })
        })
    }
}

