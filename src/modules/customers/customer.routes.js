import { Router } from "express";
const router = Router();
import * as customerController from "./controller/customer.js";

router.route('/')
    .post(customerController.addCustomer)
    .get(customerController.getCustomers);

router.route('/:customer_id')
    .get(customerController.getCustomer)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);
 
export default router;
