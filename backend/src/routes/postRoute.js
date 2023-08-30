import { Router } from "express";
import postController from "../controllers/postController.js";

const router = Router();
const controller = postController;

router.get("/size", controller.getSize);
router.get("/search", controller.search);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.get("/", controller.getList);

export default router;
