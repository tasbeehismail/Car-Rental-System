import { Schema, model } from "mongoose";

const schema = new Schema ({
    car: { 
        type: Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },
    customer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rentalDate: { 
        type: Date, 
        default : Date.now(),
        required: true 
    },
    returnDate: { 
        type: Date, 
        required: true 
    }
},{
    timestamps: true
});

const Rental = model('Rental', schema);

export default Rental;