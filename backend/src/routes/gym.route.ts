import { Router } from "express";
import GymController from "../controller/gym.controller";
import { verifyJWT } from "../middleware/auth.middleware";
const router = Router()


router.route("/").post(verifyJWT, GymController.createGym)
router.route("/").get(verifyJWT, GymController.getAllGym)
router.route("/:id").get(verifyJWT, GymController.getGym)
router.route("/member").post(verifyJWT, GymController.addMemberToGym)


export default router;
