import { Router } from "express";
import { RegisterController } from "../userAuthentication/register/controller/registerController.js";
import { AuthorizationController } from "../userAuthentication/authorization/controller/AuthorizationController.js";

export const router = Router();

router
    .get('/', (res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationField', RegisterController.ValidateField)
    .post('/new/user', RegisterController.UserRegistration)
    .post('/user/authorization', AuthorizationController.VerifyUserAuthenticity)
