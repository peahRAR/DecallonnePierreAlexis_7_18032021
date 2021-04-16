// Imports
const express = require('express');
const userCtrl = require('../controllers/UsersCtrl');
const messageCtrl = require('../controllers/MessageCtrl');
const likesCtrl = require('../controllers/LikeCtrl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageGuard = require('../middleware/messageGuard');

// Router
exports.router = (function () {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register').post(userCtrl.register);
    apiRouter.route('/users/login').post(userCtrl.login);

    // Message routes
    apiRouter.route('/messages').post(auth, multer, messageCtrl.createMessage);
    apiRouter.route('/messages').get(messageCtrl.listMessage);
    apiRouter.route('/messages/:id').put(auth, messageGuard, multer, messageCtrl.modifyMessage);
    apiRouter.route('/messages/:id').delete( auth, messageGuard, multer, messageCtrl.deleteMessage);

    // Like & Dislike
    apiRouter.route('/messages/:messageId/:type').post(auth, likesCtrl.likePost);
    return apiRouter;
})();
