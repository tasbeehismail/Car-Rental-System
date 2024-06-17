import { Schema, model } from "mongoose";

const schema = new Schema ({
    name: {
        type: String,
        required: true 
    }, 
    model: {
        type: String,
        required: true 
    },
    rental_status: {
        type: String,
        required: true,
        enum: ['available', 'rented']
    }
},{
    timestamps: true
})

const Car = model('Car', schema) 

export default Car