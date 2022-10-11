/**
 * MasterRoutes.js
 * @description :: CRUD API routes for Master
 */

const express = require('express');
const router = express.Router();
const MasterController = require('../../../controller/device/v1/MasterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/master/create').post(auth(PLATFORM.DEVICE),MasterController.addMaster);
router.route('/device/api/v1/master/list').post(auth(PLATFORM.DEVICE),MasterController.findAllMaster);
router.route('/device/api/v1/master/count').post(auth(PLATFORM.DEVICE),MasterController.getMasterCount);
router.route('/device/api/v1/master/softDeleteMany').put(auth(PLATFORM.DEVICE),MasterController.softDeleteManyMaster);
router.route('/device/api/v1/master/addBulk').post(auth(PLATFORM.DEVICE),MasterController.bulkInsertMaster);
router.route('/device/api/v1/master/updateBulk').put(auth(PLATFORM.DEVICE),MasterController.bulkUpdateMaster);
router.route('/device/api/v1/master/deleteMany').post(auth(PLATFORM.DEVICE),MasterController.deleteManyMaster);
router.route('/device/api/v1/master/softDelete/:id').put(auth(PLATFORM.DEVICE),MasterController.softDeleteMaster);
router.route('/device/api/v1/master/partial-update/:id').put(auth(PLATFORM.DEVICE),MasterController.partialUpdateMaster);
router.route('/device/api/v1/master/update/:id').put(auth(PLATFORM.DEVICE),MasterController.updateMaster);    
router.route('/device/api/v1/master/:id').get(auth(PLATFORM.DEVICE),MasterController.getMaster);
router.route('/device/api/v1/master/delete/:id').delete(auth(PLATFORM.DEVICE),MasterController.deleteMaster);

module.exports = router;
