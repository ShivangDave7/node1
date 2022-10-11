/**
 * PlanRoutes.js
 * @description :: CRUD API routes for Plan
 */

const express = require('express');
const router = express.Router();
const PlanController = require('../../../controller/device/v1/PlanController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/plan/create').post(auth(PLATFORM.DEVICE),PlanController.addPlan);
router.route('/device/api/v1/plan/list').post(auth(PLATFORM.DEVICE),PlanController.findAllPlan);
router.route('/device/api/v1/plan/count').post(auth(PLATFORM.DEVICE),PlanController.getPlanCount);
router.route('/device/api/v1/plan/softDeleteMany').put(auth(PLATFORM.DEVICE),PlanController.softDeleteManyPlan);
router.route('/device/api/v1/plan/addBulk').post(auth(PLATFORM.DEVICE),PlanController.bulkInsertPlan);
router.route('/device/api/v1/plan/updateBulk').put(auth(PLATFORM.DEVICE),PlanController.bulkUpdatePlan);
router.route('/device/api/v1/plan/deleteMany').post(auth(PLATFORM.DEVICE),PlanController.deleteManyPlan);
router.route('/device/api/v1/plan/softDelete/:id').put(auth(PLATFORM.DEVICE),PlanController.softDeletePlan);
router.route('/device/api/v1/plan/partial-update/:id').put(auth(PLATFORM.DEVICE),PlanController.partialUpdatePlan);
router.route('/device/api/v1/plan/update/:id').put(auth(PLATFORM.DEVICE),PlanController.updatePlan);    
router.route('/device/api/v1/plan/:id').get(auth(PLATFORM.DEVICE),PlanController.getPlan);
router.route('/device/api/v1/plan/delete/:id').delete(auth(PLATFORM.DEVICE),PlanController.deletePlan);

module.exports = router;
