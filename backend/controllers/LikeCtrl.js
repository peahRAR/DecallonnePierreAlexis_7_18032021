// Imports
const models = require('../models');

// Routes
module.exports = {
    likePost: function (req, res) {
        //Params
        console.log('System de Like')

        const messageId = parseInt(req.params.messageId);
        const type = parseInt(req.params.type);

        if (messageId <= 0) {
            return res.status(400).json({ 'error': "invalid parameters" });
        }

        return models.Message.findOne({
            where: { id: messageId }
        })
            .then(function (messageFound) {
                let userId = req.user.id;
                return models.Like.upsert({
                    messageId: messageFound.id,
                    userId,
                    isLike: type
                })
            })
            .then(function(result){
                res.status(200).send({success: true})
            })
            .catch(function (error) {
                console.log(error);
                return res.status(500).json({ error : "unable to verify message" });
            })
    },
    deleteLike: function (req, res){
        console.log("System de suppression de like");
        console.log(req.params.messageId);
        console.log(req.user.id);

        const messageId = parseInt(req.params.messageId);
        const userId = parseInt(req.user.id);
        models.Like.destroy({
            where: {messageId: messageId,
            userId: userId}
        }).then(() => {
            res.sendStatus(204);
        }).catch(function (err){
            console.log(err);
            res.status((500)).json({ 'error': 'cannot delete this advice'})
        })
    }
}