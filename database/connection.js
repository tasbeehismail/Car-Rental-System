import mongoose from "mongoose";

const db = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/car-rental-system').then(() => {
        console.log('Connected successfully to database');
    }).catch((err) => {
        console.log('Unable to connect to database', err);
    })
}

export default db