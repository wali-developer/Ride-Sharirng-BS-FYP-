const express = require("express");
const requestRideRoute = express.Router();
const RequestRide = require("../models/RequestedRide");

// get request
requestRideRoute.get("/", async (req, res) => {
  try {
    const requestedRides = await RequestRide.find();
    res.json(requestedRides);
  } catch (err) {
    console.log(err);
  }
});

// get request ride from specific user
requestRideRoute.get(`/:id`, async (req, res) => {
  const userId = req.params.id;
  try {
    const requestedRides = await RequestRide.find();
    const filterRequestedRides = requestedRides?.filter(ride => {
      return ride?.publisherUser?._id === userId || ride?.bookingRider?.id === userId
    });

    res.json(filterRequestedRides);
  } catch (err) {
    console.log(err);
  }
});


// Requested rides of a user
requestRideRoute.get('/requests/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const requestedRides = await RequestRide.find();
    const equestedRides = requestedRides?.filter(ride => {
      // return ride?.publisherUser?._id === userId || ride?.bookingRider?.id === userId
      return ride?.publisherUser?._id == userId && ride?.requestStatus == 'Pending'
    });

    res.json(equestedRides);
  } catch (err) {
    console.log(err);
  }
});


// Booking request
requestRideRoute.post("/", async (req, res) => {
  try {
    const requestRide = await RequestRide.create({
      goingfrom: req.body.goingfrom,
      goingto: req.body.goingto,
      passenger: req.body.passenger,
      rideStatus: req.body.rideStatus,
      date: req.body.ridedate,
      requestStatus: req.body.requestStatus,
      bookingRider: req.body.bookingRider,
      publisherUser: req.body.publisherUser,
      rideId: req.body.rideId,
      rejectionReason: req.body.rejectionReason,
    });
    res.send(
      `You requested for ${requestRide?.publisherUser?.fullName} Ride from ${requestRide.goingfrom} to ${requestRide.goingto} with ${requestRide.passenger} passenger, now you can chat with ride publisher.`
    );
  } catch (error) {
    console.log(error);
  }
});

// patch request
requestRideRoute.patch("/:id", async (req, res) => {
  try {
    const updatedbookedRide = await RequestRide.updateOne(
      { _id: req.params.id },
      {
        $set: {
          requestStatus: req.body.requestStatus,
          rejectionReason: req.body.rejectionReason,
        },
      }
    );
    res.send(`The Ride has been Updated...`);
  } catch (err) {
    res.send(err);
  }
});

// delete request
requestRideRoute.delete("/", async (req, res) => {
  res.send("we are at requestride route with delete request");
});

module.exports = requestRideRoute;
