import { Router } from "express";
import mainController from "../controllers/MainController.js";

const router = Router();
const controller = mainController;

router.get("/", controller.getRoot);

export default router;
