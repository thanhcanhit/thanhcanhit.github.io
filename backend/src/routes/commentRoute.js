import { Router } from "express";
import commentController from "../controllers/commentController.js";

const router = Router();
const controller = commentController;

router.post("/", controller.create);
router.get("/post/:postId/quantity", controller.getCommentQuantityOfPost);
router.get("/post/:postId", controller.getCommentOfPost);
router.get("/:id", controller.getOne);

export default router;
