import { Router } from "express";
import userController from "../controllers/user.controllers.ts";

const router = Router();

router.route("/signup").post(userController.signup);

export default router;
