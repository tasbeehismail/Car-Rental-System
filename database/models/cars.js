import { Schema, model } from "mongoose";

const schema = new Schema ({
    name: String, 
    model: String,
    rental_status: String
})

const Car = model('Car', schema) 

export default Car