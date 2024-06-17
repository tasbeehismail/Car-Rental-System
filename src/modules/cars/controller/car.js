import db from '../../../../database/connection.js';
import { ObjectId } from 'mongodb';

export const addCar = async (req, res) => {
    try {
        const result = await db.collection('cars').insertOne(req.body);
        return res.status(201).json({ message: 'Car created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCars = async (req, res) => {
    try {
        const result = await db.collection('cars').find({}, { 
            projection: { 
                _id: 0,
                name: 1,
                model: 1
            } 
        }).toArray();   
        return res.status(200).json({ message: 'Cars fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCar = async (req, res) => {
    try {
        const result = await db.collection('cars').findOne({ _id: new ObjectId(req.params.car_id) }, {
            projection: {
                _id: 0,
                name: 1,
                model: 1
            }
        });
        return res.status(200).json({ message: 'Car fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCar = async (req, res) => {
    try {
        const result = await db.collection('cars').updateOne({ _id: new ObjectId(req.params.car_id) }, { $set: req.body });
        return res.status(200).json({ message: 'Car updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const result = await db.collection('cars').deleteOne({ _id: new ObjectId(req.params.car_id) });
        return res.status(200).json({ message: 'Car deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getModels = async (req, res) => {
    console.log('I am inside getAvailableCars');
};
