import { Router } from "express";
const router = Router();
import * as rentalController from "./controller/rental.js";

router.post('/create', rentalController.addRental);
router.get('/readAll', rentalController.getRental);
router.get('/read/:rental_id', rentalController.getRentals);
router.put('/update', rentalController.updateRental);
router.delete('/delete', rentalController.deleteRental);

export default router;
