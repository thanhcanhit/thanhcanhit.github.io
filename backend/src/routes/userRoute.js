import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();
const controller = userController;

router.get("/:username", controller.getOne);
router.post("/", controller.create);
router.get("/", controller.getList);

export default router;
