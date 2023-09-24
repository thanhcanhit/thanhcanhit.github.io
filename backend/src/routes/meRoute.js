const { Router } = require("express");
const meController = require("../controllers/meController.js");
const middlewareController = require("./../controllers/middlewareController.js");
const router = Router();
const controller = meController;
router.get("/posts/size", controller.getListSize);
router.get(
	"/posts",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getList
);
router.get("/posts/deleted/size", controller.getListDeletedSize);
router.get(
	"/posts/deleted",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getListDeleted
);
router.get(
	"/posts/size",
	middlewareController.verifyAndAdmin.bind(middlewareController),
	controller.getSize
);
module.exports = router;
