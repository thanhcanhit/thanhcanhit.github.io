import { Router } from "express";
import tagController from "../controllers/tagController.js";

const router = Router();
const controller = tagController;

router.post("/", controller.create);
router.get("/", controller.getAll);

export default router;
