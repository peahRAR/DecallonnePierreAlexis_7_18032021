// Imports
const models = require('../models');

module.exports = (req, res, next) => {
    try {
        console.log('Middleware Message Guard')
        user = req.user;
        console.log(req.user);
        idMessage = req.params.id;
        models.Message.findByPk(idMessage)
            .then((message)=>{
                if (message.userId !== user.id && !user.isAdmin) {
                    return res.status(403).json({ error : "you don't have permission" })
                }
                next();
            })
            .catch((error) => {
                return res.status(404).json({ error : 'This message doesnt exist' })
            })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
}