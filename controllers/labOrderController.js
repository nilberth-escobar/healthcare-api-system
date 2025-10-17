const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('labOrders').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('labOrders').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createLabOrder = async (req, res) => {
    const labOrder = {
        testsRequested: req.body.testsRequested,
        orderDate: req.body.orderDate,
        results: req.body.results
    };
    const response = await mongodb.getDb().db().collection('labOrders').insertOne(labOrder);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the lab order.');
    }
};

const updateLabOrder = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const labOrder = {
        testsRequested: req.body.testsRequested,
        orderDate: req.body.orderDate,
        results: req.body.results
    };
    const response = await mongodb.getDb().db().collection('labOrders').replaceOne({ _id: userId }, labOrder);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the lab order.');
    }
};

const deleteLabOrder = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('labOrders').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the lab order.');
    }
};

module.exports = { getAll, getSingle, createLabOrder, updateLabOrder, deleteLabOrder };
