const { body, validationResult } = require('express-validator');

const patientValidationRules = () => {
    return [
        body('name').isString().notEmpty().withMessage('Name is required.'),
        body('dateOfBirth').isISO8601().toDate().withMessage('Valid Date of Birth is required.'),
        // Validate contactInfo as an object with phone and email properties
        body('contactInfo').isObject().withMessage('contactInfo must be an object.'),
        body('contactInfo.phone').isString().notEmpty().withMessage('Phone is required in contactInfo.'),
        body('contactInfo.email').isEmail().withMessage('A valid email is required in contactInfo.'),
        body('address').isString().notEmpty().withMessage('Address is required.'),
        body('medicalHistory').isArray().withMessage('Medical history must be an array.')
    ];
};

const doctorValidationRules = () => {
    return [
        body('name').isString().notEmpty().withMessage('Name is required.'),
        body('specialty').isString().notEmpty().withMessage('Specialty is required.'),
        body('licenseNumber').isString().notEmpty().withMessage('License number is required.'),
        // Validate contactInfo as an object with phone and email properties
        body('contactInfo').isObject().withMessage('contactInfo must be an object.'),
        body('contactInfo.phone').isString().notEmpty().withMessage('Phone is required in contactInfo.'),
        body('contactInfo.email').isEmail().withMessage('A valid email is required in contactInfo.'),
        body('availability').isArray().withMessage('Availability must be an array.')
    ];
};

const appointmentValidationRules = () => {
    return [
        body('dateTime').isISO8601().toDate().withMessage('A valid date and time are required.'),
        body('status').isIn(['scheduled', 'completed', 'canceled']).withMessage('Invalid status.'),
    ];
};

const labOrderValidationRules = () => {
    return [
        body('testsRequested').isArray().withMessage('Tests requested must be an array.'),
        body('orderDate').isISO8601().toDate().withMessage('A valid order date is required.')
    ];
};

const prescriptionValidationRules = () => {
    return [
        body('medicationDetails').isArray().withMessage('Medication details must be an array.'),
        body('issueDate').isISO8601().toDate().withMessage('A valid issue date is required.')
    ];
};

const medicalRecordValidationRules = () => {
    return [
        body('visitDate').isISO8601().toDate().withMessage('A valid visit date is required.'),
        body('diagnosis').isString().notEmpty().withMessage('Diagnosis is required.'),
        body('treatmentNotes').isString().notEmpty().withMessage('Treatment notes are required.')
    ];
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    // Use err.path instead of err.param for express-validator v7+
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    patientValidationRules,
    doctorValidationRules,
    appointmentValidationRules,
    labOrderValidationRules,
    prescriptionValidationRules,
    medicalRecordValidationRules,
    validate,
};
