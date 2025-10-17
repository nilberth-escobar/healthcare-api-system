const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('appointments').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('appointments').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createAppointment = async (req, res) => {
    const appointment = {
        dateTime: req.body.dateTime,
        status: req.body.status,
        notes: req.body.notes
    };
    const response = await mongodb.getDb().db().collection('appointments').insertOne(appointment);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the appointment.');
    }
};

const updateAppointment = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const appointment = {
        dateTime: req.body.dateTime,
        status: req.body.status,
        notes: req.body.notes
    };
    const response = await mongodb.getDb().db().collection('appointments').replaceOne({ _id: userId }, appointment);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the appointment.');
    }
};

const deleteAppointment = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('appointments').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the appointment.');
    }
};

module.exports = { getAll, getSingle, createAppointment, updateAppointment, deleteAppointment };
