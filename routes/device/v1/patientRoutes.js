/**
 * patientRoutes.js
 * @description :: CRUD API routes for patient
 */

const express = require('express');
const router = express.Router();
const patientController = require('../../../controller/device/v1/patientController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/patient/create').post(auth(PLATFORM.DEVICE),patientController.addPatient);
router.route('/device/api/v1/patient/list').post(auth(PLATFORM.DEVICE),patientController.findAllPatient);
router.route('/device/api/v1/patient/count').post(auth(PLATFORM.DEVICE),patientController.getPatientCount);
router.route('/device/api/v1/patient/softDeleteMany').put(auth(PLATFORM.DEVICE),patientController.softDeleteManyPatient);
router.route('/device/api/v1/patient/addBulk').post(auth(PLATFORM.DEVICE),patientController.bulkInsertPatient);
router.route('/device/api/v1/patient/updateBulk').put(auth(PLATFORM.DEVICE),patientController.bulkUpdatePatient);
router.route('/device/api/v1/patient/deleteMany').post(auth(PLATFORM.DEVICE),patientController.deleteManyPatient);
router.route('/device/api/v1/patient/softDelete/:id').put(auth(PLATFORM.DEVICE),patientController.softDeletePatient);
router.route('/device/api/v1/patient/partial-update/:id').put(auth(PLATFORM.DEVICE),patientController.partialUpdatePatient);
router.route('/device/api/v1/patient/update/:id').put(auth(PLATFORM.DEVICE),patientController.updatePatient);    
router.route('/device/api/v1/patient/:id').get(auth(PLATFORM.DEVICE),patientController.getPatient);
router.route('/device/api/v1/patient/delete/:id').delete(auth(PLATFORM.DEVICE),patientController.deletePatient);

module.exports = router;
