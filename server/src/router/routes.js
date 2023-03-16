import { Router } from "express";
import { RegisterController } from "../userAuthentication/register/controller/registerController.js";
import { AuthorizationController } from "../userAuthentication/authorization/controller/authorizationController.js";
import { RecoveryPasswordController } from "../userAuthentication/recoveryPassword/controller/recoveryPasswordController.js";
export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationfield', RegisterController.ValidateField)
    .post('/new/user', RegisterController.UserRegistration)
    .post('/user/authorization', AuthorizationController.VerifyUserAuthenticity)
    .post('/user/recoverypassword', RecoveryPasswordController.recoveryPassword)
