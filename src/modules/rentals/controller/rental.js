import db from '../../../../database/connection.js';
import { ObjectId } from 'mongodb';

export const getRentals = async (req, res) => {
    try { 
        const result = await db.collection('rentals').aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                },
            },
            {
                $lookup: {
                    from: "cars",
                    localField: "car_id",
                    foreignField: "_id",
                    as: "car"
                }
            }
        ]).toArray();
        

        return res.status(200).json({ message: 'Rentals fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRental = async (req, res) => {
    try {
        const result = await db.collection('rentals').aggregate([
            { $match: { _id: new ObjectId(req.params.rental_id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                },
            },
            {
                $lookup: {
                    from: "cars",
                    localField: "car_id",
                    foreignField: "_id",
                    as: "car"
                }
            }
        ]).toArray();

        return res.status(200).json({ message: 'Rental fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createRental = async (req, res) => {
    try {
        const car = await db.collection('cars').findOne({ _id: new ObjectId(req.body.car_id) });
        if (car.rental_status === 'rented' || new Date(car.returned_date) > new Date()) {
            return res.status(400).json({ message: 'Car is already rented' });
        }

        const result = await db.collection('rentals').insertOne(req.body);
        
        await db.collection('cars').updateOne(
            { _id: new ObjectId(req.body.car_id) }, 
            { $set: { 'rental-status': 'rented' } });

        return res.status(201).json({ message: 'Rental created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRental = async (req, res) => {
    try {
        const result = await db.collection('rentals').updateOne({ _id: new ObjectId(req.params.rental_id) }, { $set: req.body });
        return res.status(200).json({ message: 'Rental updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteRental = async (req, res) => {
    try {
        const result = await db.collection('rentals').deleteOne({ _id: new ObjectId(req.params.rental_id) });
        await db.collection('cars').updateOne(
            { _id: new ObjectId(req.body.car_id) }, 
            { $set: { 'rental-status': 'available' } });

        return res.status(200).json({ message: 'Rental deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};