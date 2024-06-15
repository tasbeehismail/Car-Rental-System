import Rental from '../../../../database/models/rental.js';
import Car from '../../../../database/models/car.js';

export const getRentals = async (req, res) => {
    try { 
        const rentals = await Rental.find()
        .populate('customer')
        .populate('car');

        return res.status(200).json({ message: 'Rentals fetched successfully', data: rentals });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.rental_id)
            .populate('customer')
            .populate('car');

        return res.status(200).json({ message: 'Rental fetched successfully', data: rental });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createRental = async (req, res) => {
    try {
        const car = await Car.findById(req.body.car);
        if (car.rental_status === 'rented') {
            return res.status(400).json({ message: 'Car is already rented' });
        }

        const result = await Rental.create(req.body);
        await Car.findByIdAndUpdate(req.body.car, { rental_status: "rented" }, {new: true});

        return res.status(201).json({ message: 'Rental created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateRental = async (req, res) => {
    try {
        const result = await Rental.findByIdAndUpdate(req.params.rental_id, req.body, { new: true });
        // if change car_id, update the car status to available
        if (req.body.car && req.body.car != result.car) {
            const car = await Car.findById(req.body.car);
            if (car.rental_status === 'rented') {
                return res.status(400).json({ message: 'Car is already rented' });
            }
            await Car.findByIdAndUpdate(result.car, { rental_status: "available" });
            await Car.findByIdAndUpdate(req.body.car, { rental_status: "rented" });
        }
        return res.status(200).json({ message: 'Rental updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteRental = async (req, res) => {
    try {
        const result = await Rental.findByIdAndDelete(req.params.rental_id);
        await Car.findByIdAndUpdate(
            result.car, 
            { rental_status: 'available' });

        return res.status(200).json({ message: 'Rental deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};