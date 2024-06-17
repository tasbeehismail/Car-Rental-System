import { Router } from "express";
const router = Router();
import * as carController from "./controller/car.js";
 

router.route('/special')
    .get(carController.getCarsOfSpecificModels);
    
router.route('/')
    .post(carController.addCar)
    .get(carController.getCars);

router.route('/:car_id')
    .get(carController.getCar)
    .put(carController.updateCar)
    .delete(carController.deleteCar);

 
export default router;
