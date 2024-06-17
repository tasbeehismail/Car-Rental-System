import Car from '../../../../database/models/car.js'

export const addCar = async (req, res) => {
    try {
        const result = await Car.create(req.body);
        return res.status(201).json({ message: 'Car created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCars = async (req, res) => {
    try {
        const result = await Car.find()
        .select('name model rental_status -_id');   
        return res.status(200).json({ message: 'Cars fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCar = async (req, res) => {
    try {
        const result = await Car.findById(req.params.car_id)
        .select('name model rental_status -_id');   ;
        return res.status(200).json({ message: 'Car fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCar = async (req, res) => {
    try {
        const result = await Car.findByIdAndUpdate(req.params.car_id, req.body, {new: true});
        return res.status(200).json({ message: 'Car updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const result = await Car.findByIdAndDelete(req.params.car_id);
        return res.status(200).json({ message: 'Car deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
