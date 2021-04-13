// Imports
const models = require('../models');

module.exports = (req, res, next) => {
    try {
        user = req.user;
        idMessage = req.params.id;
        models.Message.findByPk(idMessage)
            .then((message)=>{
                if (message.userId !== user.id) {
                    return res.status(403).json({ error : "you don't have permission" })
                }
                next();
            })
            .catch((error) => {
                return res.status(404).json({ error : 'This message doesnt exist' })
            })
    } catch (error) {
        return res.status(400).json({ error })
    }
}