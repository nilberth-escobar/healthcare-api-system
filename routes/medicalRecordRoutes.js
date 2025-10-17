const express = require('express');
const router = express.Router();
const medicalRecordsController = require('../controllers/medicalRecordController');
const { medicalRecordValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', medicalRecordsController.getAll);
router.get('/:id', medicalRecordsController.getSingle);
router.post('/', isAuthenticated, medicalRecordValidationRules(), validate, medicalRecordsController.createMedicalRecord);
router.put('/:id', isAuthenticated, medicalRecordValidationRules(), validate, medicalRecordsController.updateMedicalRecord);
router.delete('/:id', isAuthenticated, medicalRecordsController.deleteMedicalRecord);

module.exports = router;
