import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller.js';
export const userRouter = express.Router();

userRouter.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('FirstName must be atleast 3 characters long.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long.')
], userController.registerUser)
