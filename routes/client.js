const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/client");

router.get("/", controller.allParcels);
router.post("/postParcel", controller.postParcel);
router.delete("/removeParcel", controller.removeParcel);

module.exports = router;
