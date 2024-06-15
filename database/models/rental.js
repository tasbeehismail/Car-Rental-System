import { Schema, model } from "mongoose";

const rentalSchema = new Schema ({
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rentalDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
});

const Rental = model('Rental', rentalSchema);

export default Rental;
