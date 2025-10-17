const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('patients').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('patients').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createPatient = async (req, res) => {
    const patient = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        contactInfo: req.body.contactInfo,
        address: req.body.address, // Added address
        medicalHistory: req.body.medicalHistory
    };
    const response = await mongodb.getDb().db().collection('patients').insertOne(patient);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the patient.');
    }
};

const updatePatient = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const patient = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        contactInfo: req.body.contactInfo,
        address: req.body.address, // Added address
        medicalHistory: req.body.medicalHistory
    };
    const response = await mongodb.getDb().db().collection('patients').replaceOne({ _id: userId }, patient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the patient.');
    }
};

const deletePatient = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('patients').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the patient.');
    }
};

module.exports = { getAll, getSingle, createPatient, updatePatient, deletePatient };
