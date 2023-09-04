import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();
const controller = authController;

router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.post("/register", controller.register);

export default router;
