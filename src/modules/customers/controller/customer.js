import db from '../../../../database/connection.js';
import { ObjectId } from 'mongodb';

export const addCustomer = async (req, res) => {
    try {
        const result = await db.collection('customers').insertOne(req.body);
        return res.status(201).json({ message: 'Customer created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCustomers = async (req, res) => {
    try {
        const result = await db.collection('customers').find().toArray();   
        return res.status(200).json({ message: 'Customers fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCustomer = async (req, res) => {
    try {
        const result = await db.collection('customers').findOne({ _id: new ObjectId(req.params.customer_id) });
        return res.status(200).json({ message: 'Customer fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const result = await db.collection('customers').updateOne({ _id: new ObjectId(req.params.customer_id) }, { $set: req.body });
        return res.status(200).json({ message: 'Customer updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const result = await db.collection('customers').deleteOne({ _id: new ObjectId(req.params.customer_id) });
        return res.status(200).json({ message: 'Customer deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
