const { Router } = require("express");
const tagController = require("../controllers/tagController.js");

const router = Router();
const controller = tagController;
router.post("/", controller.create);
router.get("/", controller.getAll);

module.exports = router;
