import { Router } from "express";
import UserController from "../controller/user.controller";
const router = Router()

router.route("/").post(UserController.createUser)
router.route("/").get(UserController.getAllUsers)

export default router;
