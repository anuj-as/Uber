import * as rideService from "../services/ride.service.js";
import * as mapService from "../services/map.service.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import { rideModel } from "../models/ride.model.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
    res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 25)
    ride.otp = "";

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser
      })
    })

    // console.log(captainsInRadius)

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

}

export const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })
    res.status(200).json(ride)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    })
    return res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain })
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-ended',
      data: ride
    })

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
