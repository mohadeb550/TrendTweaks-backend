
import express from 'express';
import { authControllers } from './auth.controllers';
import { userValidations } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validations';
const router = express.Router();


router.post('/register', validateRequest(userValidations.userValidationSchema) , authControllers.createUser )

router.post('/login', validateRequest(authValidations.loginValidationSchema) , authControllers.loginUser )

export const AuthRoutes = router;