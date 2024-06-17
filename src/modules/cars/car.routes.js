import { Router } from "express";
const router = Router();
import * as carController from "./controller/car.js";
import db from "../../../database/connection.js";

router.route('/')
    .post(carController.addCar)
    .get(carController.getCars);

router.route('/:car_id')
    .get(carController.getCar)
    .put(carController.updateCar)
    .delete(carController.deleteCar);

router.route('/models')
    .get(carController.getModels);
export default router;
