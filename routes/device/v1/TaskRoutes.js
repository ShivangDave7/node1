/**
 * TaskRoutes.js
 * @description :: CRUD API routes for Task
 */

const express = require('express');
const router = express.Router();
const TaskController = require('../../../controller/device/v1/TaskController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/task/create').post(auth(PLATFORM.DEVICE),TaskController.addTask);
router.route('/device/api/v1/task/list').post(auth(PLATFORM.DEVICE),TaskController.findAllTask);
router.route('/device/api/v1/task/count').post(auth(PLATFORM.DEVICE),TaskController.getTaskCount);
router.route('/device/api/v1/task/softDeleteMany').put(auth(PLATFORM.DEVICE),TaskController.softDeleteManyTask);
router.route('/device/api/v1/task/addBulk').post(auth(PLATFORM.DEVICE),TaskController.bulkInsertTask);
router.route('/device/api/v1/task/updateBulk').put(auth(PLATFORM.DEVICE),TaskController.bulkUpdateTask);
router.route('/device/api/v1/task/deleteMany').post(auth(PLATFORM.DEVICE),TaskController.deleteManyTask);
router.route('/device/api/v1/task/softDelete/:id').put(auth(PLATFORM.DEVICE),TaskController.softDeleteTask);
router.route('/device/api/v1/task/partial-update/:id').put(auth(PLATFORM.DEVICE),TaskController.partialUpdateTask);
router.route('/device/api/v1/task/update/:id').put(auth(PLATFORM.DEVICE),TaskController.updateTask);    
router.route('/device/api/v1/task/:id').get(auth(PLATFORM.DEVICE),TaskController.getTask);
router.route('/device/api/v1/task/delete/:id').delete(auth(PLATFORM.DEVICE),TaskController.deleteTask);

module.exports = router;
