import { Schema, model } from "mongoose";

const schema = new Schema ({
    name: String, 
    email: String,
    password: String,
    phone: String,
    role: String
})

const User = model('User', schema) 

export default User