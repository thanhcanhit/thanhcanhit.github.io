import { Router } from "express";
import postController from "../controllers/postController.js";
import middlewareController from "./../controllers/middlewareController.js";

const router = Router();
const controller = postController;

router.get("/size", controller.getSize);
router.get("/search", controller.search);
router.patch(
	"/:post_id/restore",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.restore
);
router.patch(
	"/:post_id",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.delete
);
router.delete(
	"/:post_id",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.forceDelete
);
router.get("/:id", controller.getOne);
router.put(
	"/:post_id",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.put
);
router.post(
	"/",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.create
);
router.get("/", controller.getList);

export default router;
