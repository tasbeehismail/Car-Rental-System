import db from '../../../../database/connection.js';
import { ObjectId } from 'mongodb';

export const getRentals = async (req, res) => {
    try {
        const result = await db.collection('rentals').aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "customer",
                    foreignField: "_id",
                    as: "customer"
                },
            },
            {
                $lookup: {
                    from: "cars",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $project: {
                    _id: 0,
                    rentalDate: 1,
                    returnDate: 1,
                    "customer.name": 1,
                    "customer.email": 1,
                    "customer.phone": 1,
                    "car.name": 1,
                    "car.model": 1
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
                    localField: "customer",
                    foreignField: "_id",
                    as: "customer"
                },
            },
            {
                $lookup: {
                    from: "cars",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $project: {
                    _id: 0,
                    rentalDate: 1,
                    returnDate: 1,
                    "customer.name": 1,
                    "customer.email": 1,
                    "customer.phone": 1,
                    "car.name": 1,
                    "car.model": 1
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
        const car = await db.collection('cars').findOne({ _id: new ObjectId(req.body.car) });
        if (car.rental_status === 'rented') {
            return res.status(400).json({ message: 'Car is already rented' });
        }

        const rental = {
            customer: new ObjectId(req.body.customer),
            rentalDate: new Date(req.body.rentalDate),
            returnDate: new Date(req.body.returnDate),
            car: new ObjectId(req.body.car)
        };

        const result = await db.collection('rentals').insertOne(rental);

        await db.collection('cars').updateOne(
            { _id: new ObjectId(req.body.car) },
            { $set: { 'rental_status': 'rented' } });

        return res.status(201).json({ message: 'Rental created successfully', data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRental = async (req, res) => {
    try {
        const rentalId = req.params.rental_id;
        const newCarId = req.body.car;

        let rental = await db.collection('rentals').findOne({ _id: new ObjectId(rentalId) });
        if (!rental) {
          return res.status(404).send('Rental not found');
        }

        if (newCarId && newCarId !== rental.car.toString()) {
            const car = await db.collection('cars').findOne({ _id: new ObjectId(newCarId) });
            if (car.rental_status === 'rented') {
                return res.status(400).json({ message: 'Car is already rented' });
            }

            // Update car status of the old car to 'available'
            await db.collection('cars').updateOne({ _id: new ObjectId(rental.car) }, { $set: { rental_status: 'available' } });

            // Update car status of the new car to 'rented'
            await db.collection('cars').updateOne({ _id: new ObjectId(newCarId) }, { $set: { rental_status: 'rented' } });

            // Update the rental with the new car ID
            rental = await db.collection('rentals').findOneAndUpdate(
                { _id: new ObjectId(rentalId) },
                { $set: { car: new ObjectId(newCarId) } },
                { returnDocument: 'after' }
            );
        } else {
            // Update other fields of the rental
            rental = await db.collection('rentals').findOneAndUpdate(
                { _id: new ObjectId(rentalId) },
                { $set: req.body },
                { returnDocument: 'after' }
            );
        }
        
        return res.status(200).json({ message: 'Rental updated successfully', data: rental.value });
    } catch (error) {
        console.log(error);
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