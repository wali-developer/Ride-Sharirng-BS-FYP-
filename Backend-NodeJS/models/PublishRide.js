const mongoose = require("mongoose");
const publishRideSchema = mongoose.Schema({
  goingfrom: {
    type: String,
    required: true,
  },
  goingto: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  passenger: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  publisherUser: {
    type: Object,
  },
  date: {
    type: Date,
    Dateformat: "dd/mm/yyyy",
    required: true,
  },
  // ridePublisherId: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model("PublishRide", publishRideSchema);
