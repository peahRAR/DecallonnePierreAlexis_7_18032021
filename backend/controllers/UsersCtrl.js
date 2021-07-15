// Imports
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const models = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Regex const
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

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
    // INSCRIPTION USER
    register: async function (req, res) {

        if (req.body.email == null || req.body.username == null || req.body.password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        // Verification format username
        if (req.body.username.length >= 21 || req.body.username.length <= 2) {
            return res.status(400).json({ 'error': 'Wrong username (must be length 3 - 20)' });
        }

        // Verification si le nom d'utilisateur est disponible
        try {
            const userFound = await models.User.findOne({ where: { "username": req.body.username } })
            if (userFound) {
                return res.status(400).json({
                    'error': 'This username already used'
                });
            }
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
        // Regex format Email
        if (!EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({ 'error': 'Email is not valid' });
        }

        // Regex format Password
        if (!PASSWORD_REGEX.test(req.body.password)) {
            return res.status(400).json({ 'error': 'Password is not valid' });
        }

        // Params
        let email = {
            // Mail Identifier permet de crypter l'e-mail de maniere unidirectionnel 
            mailIdentifier: cryptedHmac(req.body.email, process.env.PASSWORDMAIL),
            // Mail Data crypte l'email mais avec possibilité de récupéré la chaine de caractere original
            mailData: crypted(req.body.email)
        };
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let isAdmin = false;
        let isInactive = false;

        // Find if not exist
        await models.User.findOne({ where: { 'email.mailIdentifier': cryptedHmac(req.body.email, process.env.PASSWORDMAIL) && !isInactive } })
            .then(function (mailFound) {
                if (!mailFound) {
                    let user = models.User.create({
                        email,
                        password,
                        username,
                        isAdmin,
                        isInactive
                    })
                        .then(() => res.status(201).json({
                            'userId': user.id
                        }))
                        .catch(error => res.status(500).json({
                            'error': 'cannot add user'
                        }));

                } else {
                    return res.status(409).json({ 'error': 'An account already exists for this email' });
                }
            })
            .catch(function (error) {
                console.log("erreur :" + error);
                return res.status(500).json({ 'error': 'unable to verify user' });
            });
    },

    // LOGIN
    login: async function (req, res) {
        const { Op } = require("sequelize");
        let where = {
            [Op.and]: [
                { "email.mailIdentifier": cryptedHmac(req.body.email, process.env.PASSWORDMAIL) },
                { isInactive: false }
            ]
        };

        await models.User.findOne({
            where: where
        }).then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        isInactive: user.isInactive,
                        expireDate: (Date.now() + 86400000),
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.RDM_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
            .catch(error => res.status(500).json({ error }));
    },

    // DELETE USER
    delete: async function (req, res) {
        try {
            const user = await models.User.findOne({ where: { "id": req.params.id } });
            if (!user) {
                res.status(404).json({ "error": "Utilisateur introuvable" })
            }

            user.isInactive = true

            await user.save()
                .then(() => {
                    res.status(204).json({ message: "Utilisateur supprimé" })
                })
                .catch((error) => {
                    res.status(400).json({ error })
                })
        } catch (error) {
            console.log(error);
        }
    },

    // MODIFY ADMIN
    adminParams: async function (req, res){
        try {
            const user = await models.User.findOne({where: { "id": req.params.id}});
            if (!user) {
               res.status(404).json({"error": "User introuvable"}) 
            }

            console.log(user)

            if (user.isAdmin) {
                user.isAdmin = false
            } else if(!user.isAdmin){
                user.isAdmin = true
            }

            await user.save()
            .then(()=>{
                res.status(201).json({ message: "droits d'accés modifié"})
            })
            .catch ((error) => {
                res.status(400).json({error})
            })

        } catch (error) {
            res.status(400).json({error : "catch du trycatch"})
        }
    },

    // READ USER
    findUsers: async function (req, res) {
        const { Op } = require("sequelize");
        let order = req.query.order;
        let fields = req.query.fields;

        models.User.findAll({
            order: [(order != null) ? order.split(':') : ['username', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            where: { [Op.and]: [{ id: {[Op.ne]:1} }, { isInactive: false }] }
        }).then(function (users) {
            if (users) {
                console.log("users : " + users)
                res.status(200).json({
                    ...users
                })
            } else {
                res.status(404).json({ "error": "User not found" });
            }
        })
    }
}
