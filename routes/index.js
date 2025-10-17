const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.use('/', require('./swagger'));
router.use('/patients', require('./patientRoute'));
router.use('/doctors', require('./doctorRoutes'));
router.use('/appointments', require('./appointmentRoutes'));
router.use('/lab-orders', require('./labOrderRoutes'));
router.use('/prescriptions', require('./prescriptionRoutes'));
router.use('/medical-records', require('./medicalRecordRoutes'));


module.exports = router;
