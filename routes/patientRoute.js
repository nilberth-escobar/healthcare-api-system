const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientController');
const { patientValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getSingle);
router.post('/', isAuthenticated, patientValidationRules(), validate, patientsController.createPatient);
router.put('/:id', isAuthenticated, patientValidationRules(), validate, patientsController.updatePatient);
router.delete('/:id', isAuthenticated, patientsController.deletePatient);

module.exports = router;
