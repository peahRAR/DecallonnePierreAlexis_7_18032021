// Imports
const express = require('express');
const userCtrl = require('../controllers/UsersCtrl');
const messageCtrl = require('../controllers/MessageCtrl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Router
exports.router = (function(){
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);

    // Message routes
    apiRouter.route('/message/create/').post(auth, multer, messageCtrl.createMessage);

    return apiRouter;
})();