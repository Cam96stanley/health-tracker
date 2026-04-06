import { Router } from "express";
import entryControllers from "../controllers/entry.controllers.ts";
import auth from "../middleware/auth.ts";

const router = Router();

router
  .route("/")
  .post(auth, entryControllers.createEntry)
  .get(auth, entryControllers.getEntries);
router
  .route("/:id")
  .get(auth, entryControllers.getEntry)
  .patch(auth, entryControllers.updateEntry);

export default router;
