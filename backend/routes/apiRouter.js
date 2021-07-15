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
    apiRouter.route('/users/:id').delete(auth, userCtrl.delete);
    apiRouter.route('/users').get(auth, userCtrl.findUsers);
    apiRouter.route('/users/:id').put(auth, userCtrl.adminParams);

    // Message routes
    apiRouter.route('/messages').post(auth, multer, messageCtrl.createMessage);
    apiRouter.route('/messages').get(messageCtrl.listMessage);
    apiRouter.route('/messages/:id').put(auth, messageGuard, multer, messageCtrl.modifyMessage);
    apiRouter.route('/messages/:id').delete( auth, messageGuard, multer, messageCtrl.deleteMessage);

    // Like & Dislike
    apiRouter.route('/messages/:messageId/:type').post(auth, likesCtrl.likePost);
    apiRouter.route('/messages/:messageId/delete').delete(auth, likesCtrl.deleteLike);
    return apiRouter;
})();
