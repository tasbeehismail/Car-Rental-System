import { Router } from "express";
const router = Router();
import * as rentalController from "./controller/rental.js";

router.route('/')
    .post(rentalController.createRental)
    .get(rentalController.getRentals);

router.route('/:rental_id')
    .get(rentalController.getRental)
    .put(rentalController.updateRental)
    .delete(rentalController.deleteRental);
 
export default router;
