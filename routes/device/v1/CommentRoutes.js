/**
 * CommentRoutes.js
 * @description :: CRUD API routes for Comment
 */

const express = require('express');
const router = express.Router();
const CommentController = require('../../../controller/device/v1/CommentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/comment/create').post(auth(PLATFORM.DEVICE),CommentController.addComment);
router.route('/device/api/v1/comment/list').post(auth(PLATFORM.DEVICE),CommentController.findAllComment);
router.route('/device/api/v1/comment/count').post(auth(PLATFORM.DEVICE),CommentController.getCommentCount);
router.route('/device/api/v1/comment/softDeleteMany').put(auth(PLATFORM.DEVICE),CommentController.softDeleteManyComment);
router.route('/device/api/v1/comment/addBulk').post(auth(PLATFORM.DEVICE),CommentController.bulkInsertComment);
router.route('/device/api/v1/comment/updateBulk').put(auth(PLATFORM.DEVICE),CommentController.bulkUpdateComment);
router.route('/device/api/v1/comment/deleteMany').post(auth(PLATFORM.DEVICE),CommentController.deleteManyComment);
router.route('/device/api/v1/comment/softDelete/:id').put(auth(PLATFORM.DEVICE),CommentController.softDeleteComment);
router.route('/device/api/v1/comment/partial-update/:id').put(auth(PLATFORM.DEVICE),CommentController.partialUpdateComment);
router.route('/device/api/v1/comment/update/:id').put(auth(PLATFORM.DEVICE),CommentController.updateComment);    
router.route('/device/api/v1/comment/:id').get(auth(PLATFORM.DEVICE),CommentController.getComment);
router.route('/device/api/v1/comment/delete/:id').delete(auth(PLATFORM.DEVICE),CommentController.deleteComment);

module.exports = router;
