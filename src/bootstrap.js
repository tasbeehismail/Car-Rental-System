import express from 'express'; 
// import carRouter from './modules/cars/car.route.js'; 
// import rentalRouter from './modules/rentals/rental.route.js';
import customerRouter from './modules/customers/customer.routes.js';


const bootstrap = (app) => {
    app.use(express.json());

    // app.use('/cars', carRouter);
    // app.use('/rentals', rentalRouter);
   app.use('/customers', customerRouter);

    app.use('*', (req, res) => {
        return res.json({ message: "not found routing" });
    });
};

export default bootstrap;
