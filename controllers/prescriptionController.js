const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('prescriptions').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('prescriptions').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createPrescription = async (req, res) => {
    const prescription = {
        medicationDetails: req.body.medicationDetails,
        issueDate: req.body.issueDate
    };
    const response = await mongodb.getDb().db().collection('prescriptions').insertOne(prescription);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the prescription.');
    }
};

const updatePrescription = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const prescription = {
        medicationDetails: req.body.medicationDetails,
        issueDate: req.body.issueDate
    };
    const response = await mongodb.getDb().db().collection('prescriptions').replaceOne({ _id: userId }, prescription);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the prescription.');
    }
};

const deletePrescription = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('prescriptions').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the prescription.');
    }
};

module.exports = { getAll, getSingle, createPrescription, updatePrescription, deletePrescription };
