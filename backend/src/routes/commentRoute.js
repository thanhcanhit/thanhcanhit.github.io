const { Router } = require("express");
const commentController = require("../controllers/commentController.js");
const router = Router();
const controller = commentController;
router.post("/", controller.create);
router.get("/post/:postId/quantity", controller.getCommentQuantityOfPost);
router.get("/post/:postId", controller.getCommentOfPost);
router.get("/:id", controller.getOne);
module.exports = router;
