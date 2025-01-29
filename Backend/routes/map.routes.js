import express from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as mapController from '../controllers/map.controller.js';
import { query } from 'express-validator';

export const mapRouter = express.Router();

mapRouter.get('/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser, mapController.getCoordinates
)

mapRouter.get('/get-distance-time',
  query('origin').isString().isLength({ min: 3 }),
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser, mapController.getDistanceTime
)

mapRouter.get('/get-suggestions',
  query('input').isString().isLength({min:3}),
  authMiddleware.authUser,mapController.getAutoCompleteSuggestions
)
