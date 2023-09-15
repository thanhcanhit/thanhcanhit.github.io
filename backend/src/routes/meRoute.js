import { Router } from "express";
import meController from "../controllers/meController.js";
import middlewareController from "./../controllers/middlewareController.js";

const router = Router();
const controller = meController;

router.get(
	"/posts",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getList
);
router.get(
	"/posts/size",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getSize
);

export default router;
