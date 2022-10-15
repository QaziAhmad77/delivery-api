const { Router } = require("express");
const router = Router();

//Routers
const driverRouter = require("./driver");
const clientRouter = require("./client");

router.use("/clientHomePage", clientRouter);
router.use("/driverHomePage", driverRouter);

module.exports = router;
