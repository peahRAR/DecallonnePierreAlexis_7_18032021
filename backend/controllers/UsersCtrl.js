// Imports
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const models = require('../models');
const bcrypt = require('bcrypt');
require('dotenv');


// Cryptage
function crypted(elem) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(crypto.randomBytes(32)), crypto.randomBytes(16));
    return cipher.update(elem, 'utf-8', 'hex');
}

function cryptedHmac(elem, key) {
    return crypto.createHmac("sha256", key).update(elem).digest("hex");
}


// Routes
module.exports = {
    register: function (req, res) {
        // Params
        let email = {
            // Mail Identifier permet de crypter l'e-mail de maniere unidirectionnel 
            mailIdentifier: cryptedHmac(req.body.email, process.env.PASSWORDMAIL),
            // Mail Data crypte l'email mais avec possibilité de récupéré la chaine de caractere original
            mailData: crypted(req.body.email)
        };
        let username = req.body.username;
        let password = bcrypt.hash(req.body.password, 10);

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        // TODO use reject

        // Find if not exist
        models.User.findOne({
            attributes: ['mailIdentifier'],
            where: { mailIdentifier: mailIdentifier }
        })
            .then(function (userFound) {
                if (!userFound) {
                    let user = models.User.create({
                        email: email,
                        password: password,
                        username: username
                    })
                        .then(() => res.status(201).json({
                            'userId': user.id
                        }))
                        .catch(error => res.status(500).json({
                            'error': 'cannot add user'
                        }));

                } else {
                    return res.status(409).json({ 'error': 'user alredy exist' });
                }
            })
            .catch(function (error) {
                return res.status(500).json({ 'error': 'unable to verify user' })
            });

    },
    login: function (req, res) {

    }
}