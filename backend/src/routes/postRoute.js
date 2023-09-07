import { Router } from "express";
import postController from "../controllers/postController.js";
import middlewareController from "./../controllers/middlewareController.js";

const router = Router();
const controller = postController;

router.get("/size", controller.getSize);
router.get("/search", controller.search);
router.get("/:id", controller.getOne);
router.post("/", middlewareController.verifyAndAdmin.bind(middlewareController), controller.create);
router.get("/", controller.getList);

export default router;
