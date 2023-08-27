import { Router } from "express";
import postController from "../controllers/postController.js";

const router = Router();
const controller = postController;

router.post("/create", controller.create);
router.get("/:id", controller.getOne);
router.get("/", controller.getList);

export default router;
