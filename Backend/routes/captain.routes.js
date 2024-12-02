import express from 'express';
import { body } from 'express-validator';
import * as captainController from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

export const captainRouter = express.Router();

captainRouter.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('FirstName must be atleast 3 characters long.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long.'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long.'),
  body('vehicle.plate').isLength({ min: 6 }).withMessage('Plate must be at least 3 characters long.'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1.'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid Type"),
], captainController.registerCaptain)

captainRouter.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long.'),
],captainController.loginCaptain)

captainRouter.get('/profile',authCaptain,captainController.getCaptainProfile);

captainRouter.get('/logout',authCaptain,captainController.logoutCaptain);