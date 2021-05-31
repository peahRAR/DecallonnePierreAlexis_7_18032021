// imports
const jwt = require('jsonwebtoken');
const models = require('../models');


// Vérification du token
module.exports = (req, res, next) => {
    console.log('middleware AUTH')
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RDM_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID not valid'
        } else {
            models.User.findByPk(userId)
            .then((user)=>{
                req.user = user
                console.log("rentre dans le then du auth");
                next()
            })
        }
    } catch (error) {
        res.status(401).json({error : 'Unauthenticated request'})
    }
}