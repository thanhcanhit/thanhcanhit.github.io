const { Router } = require("express");
const userController = require("../controllers/userController.js");
const router = Router();
const controller = userController;
router.get("/:username", controller.getOne);
router.get("/", controller.getList);
module.exports = router;
