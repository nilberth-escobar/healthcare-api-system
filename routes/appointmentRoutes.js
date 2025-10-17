const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');
const { appointmentValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', appointmentsController.getAll);
router.get('/:id', appointmentsController.getSingle);
router.post('/', isAuthenticated, appointmentValidationRules(), validate, appointmentsController.createAppointment);
router.put('/:id', isAuthenticated, appointmentValidationRules(), validate, appointmentsController.updateAppointment);
router.delete('/:id', isAuthenticated, appointmentsController.deleteAppointment);

module.exports = router;
