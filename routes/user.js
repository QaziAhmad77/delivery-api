const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");
const authenticateUser = require("../middleware/authenticate_user");
const isUser = require("../middleware/is_user");
const homePageRouter = require("./homePage");

router.post("/emailSend", controller.emailSend);
router.post("/:userId/changePassword", controller.changePassword);

router.post("/signUp", controller.signUp);
router.post("/:userId/logIn", authenticateUser, controller.logIn);
router.put("/:userId/update", authenticateUser, controller.update);
router.get("/:userId/logIn/homePage", controller.homePage);
router.use("/:userId/logIn", isUser, homePageRouter);
module.exports = router;
