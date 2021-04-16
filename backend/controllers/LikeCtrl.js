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
    }
}