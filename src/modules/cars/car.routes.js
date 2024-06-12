import { Router } from "express";
const router = Router();
import * as carController from "./controller/car.js";

router.post('/create', carController.addCar);
router.get('/readAll', carController.getCar);
router.get('/read/:car_id', carController.getCars);
router.put('/update', carController.updateCar);
router.delete('/delete', carController.deleteCar);

export default router;
