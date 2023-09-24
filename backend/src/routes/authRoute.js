const { Router } = require("express");
const authController = require("../controllers/authController.js");
const router = Router();
const controller = authController;
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/refresh", controller.refresh);
router.post("/register", controller.register);
module.exports = router;
