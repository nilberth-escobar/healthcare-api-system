const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('doctors').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('doctors').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createDoctor = async (req, res) => {
    const doctor = {
        name: req.body.name,
        specialty: req.body.specialty,
        licenseNumber: req.body.licenseNumber,
        contactInfo: req.body.contactInfo
    };
    const response = await mongodb.getDb().db().collection('doctors').insertOne(doctor);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the doctor.');
    }
};

const updateDoctor = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const doctor = {
        name: req.body.name,
        specialty: req.body.specialty,
        licenseNumber: req.body.licenseNumber,
        contactInfo: req.body.contactInfo
    };
    const response = await mongodb.getDb().db().collection('doctors').replaceOne({ _id: userId }, doctor);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the doctor.');
    }
};

const deleteDoctor = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('doctors').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the doctor.');
    }
};

module.exports = { getAll, getSingle, createDoctor, updateDoctor, deleteDoctor };
