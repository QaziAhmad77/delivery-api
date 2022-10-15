const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/driver");

//image upload
const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).array("licence_images");

router.post("/pickParcel", controller.selectParcel);
router.post("/feedback", controller.feedback);
router.post("/", controller.createDriver);
router.get("/", controller.allPosts);
router.get("/driverProfile", controller.driverProfile);
router.post("/driverProfile/uploadLicenseImages",upload,controller.profilePost);

module.exports = router;
