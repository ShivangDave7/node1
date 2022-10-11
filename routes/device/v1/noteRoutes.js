/**
 * noteRoutes.js
 * @description :: CRUD API routes for note
 */

const express = require('express');
const router = express.Router();
const noteController = require('../../../controller/device/v1/noteController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/note/create').post(auth(PLATFORM.DEVICE),noteController.addNote);
router.route('/device/api/v1/note/list').post(auth(PLATFORM.DEVICE),noteController.findAllNote);
router.route('/device/api/v1/note/count').post(auth(PLATFORM.DEVICE),noteController.getNoteCount);
router.route('/device/api/v1/note/softDeleteMany').put(auth(PLATFORM.DEVICE),noteController.softDeleteManyNote);
router.route('/device/api/v1/note/addBulk').post(auth(PLATFORM.DEVICE),noteController.bulkInsertNote);
router.route('/device/api/v1/note/updateBulk').put(auth(PLATFORM.DEVICE),noteController.bulkUpdateNote);
router.route('/device/api/v1/note/deleteMany').post(auth(PLATFORM.DEVICE),noteController.deleteManyNote);
router.route('/device/api/v1/note/softDelete/:id').put(auth(PLATFORM.DEVICE),noteController.softDeleteNote);
router.route('/device/api/v1/note/partial-update/:id').put(auth(PLATFORM.DEVICE),noteController.partialUpdateNote);
router.route('/device/api/v1/note/update/:id').put(auth(PLATFORM.DEVICE),noteController.updateNote);    
router.route('/device/api/v1/note/:id').get(auth(PLATFORM.DEVICE),noteController.getNote);
router.route('/device/api/v1/note/delete/:id').delete(auth(PLATFORM.DEVICE),noteController.deleteNote);

module.exports = router;
