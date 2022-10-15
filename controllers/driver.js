const {
  Drivers,
  Parcels,
  AssignedParcels,
  DeliveredParcels,
} = require("../models");

module.exports = {
  createDriver: async (req, res) => {
    try {
      const { user } = req;
      const {
        fullName,
        registrationNumber,
        make,
        model,
        year,
        licenseImageBackUrl,
        licenseImageFrontUrl,
        licenseNumber,
        drivingMiles,
        clientsFeedback,
      } = req.body;

      const checkDriver = await Drivers.findOne({
        where: {
          full_name: fullName ? fullName : user.name,
          fk_user_id: user.id,
        },
      });
      if (checkDriver) {
        throw { error: 400, message: "driver already exists." };
      }
      if (
        !fullName ||
        !registrationNumber ||
        !make ||
        !model ||
        !year ||
        !licenseImageFrontUrl ||
        !licenseImageBackUrl ||
        !licenseNumber ||
        !drivingMiles ||
        !clientsFeedback
      ) {
        throw { error: 400, message: "Required Fields can not be empty" };
      }
      const driverProfile = await Drivers.create({
        full_name: fullName ? fullName : user.name,
        registration_number: registrationNumber,
        make,
        model,
        year,
        lincense_image_front_url: licenseImageFrontUrl,
        lincense_image_back_url: licenseImageBackUrl,
        license_number: licenseNumber,
        driving_miles: drivingMiles,
        clients_feedback: clientsFeedback,
        fk_user_id: user.id,
      });
      return res.status(200).send({ driverProfile });
      //   return res.status(307).render("driverProfile" ,{driver})
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  allPosts: async (req, res) => {
    try {
      let parcels = await Parcels.findAll();
      return res.status(307).render("driverHomePage", { parcels });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  driverProfile: async (req, res) => {
    try {
      let { user } = req;
      let driver = await Drivers.findOne({
        where: {
          fk_user_id: user.id,
        },
      });
      if (!driver) {
        throw { error: 400, message: "wrong profile i.e userId" };
      }
      console.log(driver.id);
      const customerFeedback = await DeliveredParcels.findByPk(driver.id);
      driver = await driver.update({
        clients_feedback: customerFeedback.customer_feedback,
      });
      return res.status(307).render("driverProfile", { driver });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  profilePost: async (req, res) => {
    try {
      const { user } = req;
      let driver = await Drivers.findOne({
        where: {
          fk_user_id: user.id,
        },
      });
      if (!driver) {
        throw { error: 400, message: "wrong profile i.e userId" };
      }
      driver = await driver.update({
        lincense_image_front_url: `http://localhost:3000/api/users/:userId/login/driverHomePage/driverProfile/uploadLicenseImages/${req.files[0].filename}`,
        lincense_image_back_url: `http://localhost:3000/api/users/:userId/login/driverHomePage/driverProfile/uploadLicenseImages/${req.files[1].filename}`,
      });
      res.json({
        success: 1,
        lincense_image_front_url: `http://localhost:3000/api/users/:userId/login/driverHomePage/driverProfile/uploadLicenseImages/${req.files[0].filename}`,
        lincense_image_back_url: `http://localhost:3000/api/users/:userId/login/driverHomePage/driverProfile/uploadLicenseImages/${req.files[1].filename}`,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  selectParcel: async (req, res) => {
    try {
      const { parcelId, driverId, status } = req.body;
      if (!parcelId || !driverId) {
        throw { error: 400, message: "Required fields cannot be empty." };
      }
      const parcel = await Parcels.findByPk(parcelId);
      if (!parcel) {
        throw { error: 409, message: "Parcel Does not exist." };
      }
      const driver = await Drivers.findByPk(driverId);
      if (!driver) {
        throw { error: 409, message: "Driver Does not exist." };
      }
      let assignParcel = await AssignedParcels.findOne({
        where: {
          fk_parcel_id: parcelId,
        },
      });
      if (assignParcel) {
        throw {
          error: 409,
          message: "Parcel already assigned to driver.",
        };
      }
      assignParcel = await AssignedParcels.create({
        fk_driver_id: driver.id,
        driver_name: driver.full_name,
        fk_parcel_id: parcel.id,
        parcel_name: parcel.full_name,
        status: status ? status : parcel.status,
      });
      return res.status(200).send({ assignParcel });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  feedback: async (req, res) => {
    try {
      const { parcelId, driverId, customerFeedback } = req.body;
      if (!parcelId || !driverId) {
        throw { error: 400, message: "Required fields cannot be empty." };
      }
      const parcelStatus = await AssignedParcels.findOne({
        where: {
          fk_parcel_id: parcelId,
          status: "Done",
        },
      });
      if (!parcelStatus) {
        throw { error: 400, message: "Parcel is not delivered Yet" };
      }
      const deliveredParcel = await DeliveredParcels.create({
        fk_parcel_id: parcelId,
        customer_feedback: customerFeedback,
        fk_driver_id: driverId,
      });
      res.send(deliveredParcel);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};
