const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');
const { doctorValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', doctorsController.getAll);
router.get('/:id', doctorsController.getSingle);
router.post('/', isAuthenticated, doctorValidationRules(), validate, doctorsController.createDoctor);
router.put('/:id', isAuthenticated, doctorValidationRules(), validate, doctorsController.updateDoctor);
router.delete('/:id', isAuthenticated, doctorsController.deleteDoctor);

module.exports = router;
