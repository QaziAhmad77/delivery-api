const { Parcels } = require("../models");
module.exports = {
  postParcel: async (req, res) => {
    try {
      const { user } = req;
      const {
        fullName,
        packageReceiver,
        pickupLocation,
        destinationLocation,
        parcelSize,
        paymentOffer,
        message,
        deliveryAtDoorstep,
      } = req.body;
      if (
        !fullName ||
        !packageReceiver ||
        !pickupLocation ||
        !destinationLocation ||
        !parcelSize ||
        !paymentOffer ||
        !message ||
        !deliveryAtDoorstep
      ) {
        throw { error: 400, message: "Required Fields can not be empty" };
      }
      let postParcel = await Parcels.create({
        full_name: fullName,
        package_receiver: packageReceiver,
        pickup_location: pickupLocation,
        destination_location: destinationLocation,
        parcel_size: parcelSize,
        payment_offer: paymentOffer,
        message,
        delivery_at_doorstep: deliveryAtDoorstep,
        fk_user_id: user.id,
      });
      return res.status(200).send({ postParcel });
      // return res.status(307).render("clientHomePage")
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  allParcels: async (req, res) => {
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
  removeParcel: async (req, res) => {
    try {
      const { parcelId } = req.body;
      let parcel = await Parcels.findByPk(parcelId);
      if (!parcel) {
        throw { error: 404, message: "invalid parcel Id" };
      }
      parcel = await Parcels.destroy({
        where: {
          id: parcelId,
        },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).send({ removedParcel: parcel });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};
