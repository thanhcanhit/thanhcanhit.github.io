const { Router } = require("express");
const userController = require("../controllers/userController.js");
const middlewareController = require("./../controllers/middlewareController.js");

const router = Router();
const controller = userController;
router.get("/:username", controller.getOne);
router.put(
	"/:username",
	middlewareController.verifyToken.bind(middlewareController),
	controller.update
);
router.get(
	"/",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getList
);

module.exports = router;
