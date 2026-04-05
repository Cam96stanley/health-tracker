import { Router } from "express";
import entryControllers from "../controllers/entry.controllers.ts";
import auth from "../middleware/auth.ts";

const router = Router();

router.route("/").post(auth, entryControllers.createEntry);

export default router;
