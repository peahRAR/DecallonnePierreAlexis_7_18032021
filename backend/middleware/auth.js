// imports
const jwt = require('jsonwebtoken');

// Vérification du token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, `"${process.env.RDM_TOKEN}"`);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID not valid'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ message : error | 'Unauthenticated request'})
    }
}