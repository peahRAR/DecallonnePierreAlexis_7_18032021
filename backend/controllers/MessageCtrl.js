// Imports
const models= require('../models');

// Routes
module.exports = {
    
    // CREATE
    createMessage: function(req,res){
        // Params
        let content = req.body.content;
        let userId = req.user.id;
        let tags = req.body.tags
        let attachement;

        if (req.file != undefined) {
            attachement = `${req.protocol}://${req.get('host')}/images/${req.file.attachement}`;   
        }
        
        // Verification que le content ne soit pas null
        if (content == null) {
            return res.status(400).json({ 'error' : 'need content'});
        }
        const message = models.Message.build({
            content : content,
            UserId : userId,
            likes : 0,
            tags : tags,
            attachement : attachement
        });
        message.save()
        .then(()=>{
            res.status(201).json({ message: 'published message'})
        })
        .catch((error) =>{
            res.status(400).json({error})
        })
    },
    // READ
    listMessage: function(req,res){
        
    },
    // UPDATE
    modifyMessage: function(req,res){
        
    },
    // DELETE
    deleteMessage: function(req,res){
        
    }
}

