const mongoose = require("mongoose");
const ReqRideSchema = mongoose.Schema({
  goingfrom: {
    type: String,
    required: true,
  },
  goingto: {
    type: String,
    required: true,
  },
  passenger: {
    type: Number,
    required: true,
  },
  rideStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requestStatus: {
    type: String,
    required: true,
  },
  // bookerEmail: {
  //   type: String,
  // },
  publisherUser: {
    type: Object,
  },
  // publisherId: {
  //   type: String,
  //   required: true,
  // },
  bookingRider: {
    type: Object,
  },
  // bookerId: {
  //   type: String,
  //   required: true,
  // },
  rideId: {
    type: String,
    required: true,
  },
  rejectionReason: {
    type: String,
  },
});

module.exports = mongoose.model("RequestRide", ReqRideSchema);
