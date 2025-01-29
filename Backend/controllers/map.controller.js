import * as mapService from "../services/map.service.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: 'Coordinates not found' });
  }
}

export const getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    console.log(origin, destination);
    const destinationTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(destinationTime);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error!' });

  }

}

export const getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server Error' });
  }
}