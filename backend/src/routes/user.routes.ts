import { Router } from "express";
import userController from "../controllers/user.controllers.ts";
import auth from "../middleware/auth.ts";

const router = Router();

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/me").get(auth, userController.getMe);

export default router;
