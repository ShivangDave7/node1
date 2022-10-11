/**
 * BlogRoutes.js
 * @description :: CRUD API routes for Blog
 */

const express = require('express');
const router = express.Router();
const BlogController = require('../../../controller/device/v1/BlogController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/blog/create').post(auth(PLATFORM.DEVICE),BlogController.addBlog);
router.route('/device/api/v1/blog/list').post(auth(PLATFORM.DEVICE),BlogController.findAllBlog);
router.route('/device/api/v1/blog/count').post(auth(PLATFORM.DEVICE),BlogController.getBlogCount);
router.route('/device/api/v1/blog/softDeleteMany').put(auth(PLATFORM.DEVICE),BlogController.softDeleteManyBlog);
router.route('/device/api/v1/blog/addBulk').post(auth(PLATFORM.DEVICE),BlogController.bulkInsertBlog);
router.route('/device/api/v1/blog/updateBulk').put(auth(PLATFORM.DEVICE),BlogController.bulkUpdateBlog);
router.route('/device/api/v1/blog/deleteMany').post(auth(PLATFORM.DEVICE),BlogController.deleteManyBlog);
router.route('/device/api/v1/blog/softDelete/:id').put(auth(PLATFORM.DEVICE),BlogController.softDeleteBlog);
router.route('/device/api/v1/blog/partial-update/:id').put(auth(PLATFORM.DEVICE),BlogController.partialUpdateBlog);
router.route('/device/api/v1/blog/update/:id').put(auth(PLATFORM.DEVICE),BlogController.updateBlog);    
router.route('/device/api/v1/blog/:id').get(auth(PLATFORM.DEVICE),BlogController.getBlog);
router.route('/device/api/v1/blog/delete/:id').delete(auth(PLATFORM.DEVICE),BlogController.deleteBlog);

module.exports = router;
