const express = require('express');
const router = express.Router();
const labOrdersController = require('../controllers/labOrderController');
const { labOrderValidationRules, validate } = require('../middleware/validationMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', labOrdersController.getAll);
router.get('/:id', labOrdersController.getSingle);
router.post('/', isAuthenticated, labOrderValidationRules(), validate, labOrdersController.createLabOrder);
router.put('/:id', isAuthenticated, labOrderValidationRules(), validate, labOrdersController.updateLabOrder);
router.delete('/:id', isAuthenticated, labOrdersController.deleteLabOrder);

module.exports = router;
