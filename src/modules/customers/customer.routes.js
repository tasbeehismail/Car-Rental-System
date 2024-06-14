import { Router } from "express";
const router = Router();
import * as userController from "./controller/customer.js";

router.route('/')
    .get(userController.getUsers); // done

router.route('/signup').post(userController.signup); // done
router.route('/login').post(userController.login); // done

router.route('/:user_id')
    .get(userController.getUser) // done
    .put(userController.updateUser) // for owners only
    .delete(userController.deleteUser); // for owners only
 
export default router;
