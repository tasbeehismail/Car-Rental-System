import { Schema, model } from "mongoose";

const schema = new Schema ({
    name: {
        type: String,
        required: true 
    }, 
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    }
},{
    timestamps: true
})

const User = model('User', schema) 

export default User