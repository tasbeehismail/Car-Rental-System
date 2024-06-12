import { Router } from "express";
const router = Router();
import * as customerController from "./controller/customer.js";

router.post('/create', customerController.addCustomer);
router.get('/readAll', customerController.getCustomers);
router.get('/read/:customer_id', customerController.getCustomer);
router.put('/update/:customer_id', customerController.updateCustomer);
router.delete('/delete/:customer_id', customerController.deleteCustomer);

export default router;
