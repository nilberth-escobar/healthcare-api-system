const express = require('express');
const router = express.Router();
const prescriptionsController = require('../controllers/prescriptionController');
const { prescriptionValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', prescriptionsController.getAll);
router.get('/:id', prescriptionsController.getSingle);
router.post('/', isAuthenticated, prescriptionValidationRules(), validate, prescriptionsController.createPrescription);
router.put('/:id', isAuthenticated, prescriptionValidationRules(), validate, prescriptionsController.updatePrescription);
router.delete('/:id', isAuthenticated, prescriptionsController.deletePrescription);

module.exports = router;
