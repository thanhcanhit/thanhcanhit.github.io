const { Router } = require("express");
const mainController = require("../controllers/mainController.js");

const router = Router();
const controller = mainController;
router.get("/", controller.getRoot);

module.exports = router;
