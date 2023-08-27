import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();
const controller = userController;

router.post("/create", controller.create);
router.get("/:username", controller.getOne);
router.get("/", controller.getList);

export default router;
