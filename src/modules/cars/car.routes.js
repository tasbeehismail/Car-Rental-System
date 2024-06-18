import { Router } from "express";
const router = Router();
import * as carController from "./controller/car.js";
 

router.get('/specific', carController.getCarsOfSpecificModels);
router.get('/availableWithSpecific', carController.getAvailableCarsWithSpecificModel);
router.get('/rentedOrSpecific', carController.getRentedOrSpecificModel);
router.get('/available-or-rented', carController.getRentedOrAvailableOfSpecificModels);

router.route('/')
    .post(carController.addCar)
    .get(carController.getCars);

router.route('/:car_id')
    .get(carController.getCar)
    .put(carController.updateCar)
    .delete(carController.deleteCar);

 
export default router;
