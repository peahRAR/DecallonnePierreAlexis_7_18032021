// Imports
const Message = require('../models/message');

// Routes
module.exports = {
    createMessage: function(req,res){

        // Params
        let content = req.body.content;
        // Verification que le content ne soit pas null
        if (content == null) {
            return res.status(400).json({ 'error' : 'need content'});
        }
        const message = new Message({
            content : req.body.content,
            // ToDo attachement : image upload par le user possibilité format .gif
        });
        message.save()
        .then(()=>{
            res.status(201).json({ message: 'published message'})
        })
        .catch((error) =>{
            res.status(400).json({error})
        })
    },

    listMessage: function(req,res){
        
    },
    modifyMessage: function(req,res){
        
    },
    deleteMessage: function(req,res){
        
    }
}

