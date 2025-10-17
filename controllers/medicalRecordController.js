const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('medicalRecords').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('medicalRecords').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createMedicalRecord = async (req, res) => {
    const medicalRecord = {
        visitDate: req.body.visitDate,
        diagnosis: req.body.diagnosis,
        treatmentNotes: req.body.treatmentNotes,
        attachments: req.body.attachments
    };
    const response = await mongodb.getDb().db().collection('medicalRecords').insertOne(medicalRecord);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the medical record.');
    }
};

const updateMedicalRecord = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const medicalRecord = {
        visitDate: req.body.visitDate,
        diagnosis: req.body.diagnosis,
        treatmentNotes: req.body.treatmentNotes,
        attachments: req.body.attachments
    };
    const response = await mongodb.getDb().db().collection('medicalRecords').replaceOne({ _id: userId }, medicalRecord);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the medical record.');
    }
};

const deleteMedicalRecord = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('medicalRecords').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the medical record.');
    }
};

module.exports = { getAll, getSingle, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord };
