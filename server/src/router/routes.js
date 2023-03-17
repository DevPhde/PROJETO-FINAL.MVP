import { Router } from "express";
import { AuthMiddleware } from "../Middleware/authMiddleware.js";
import { RegisterController } from "../userAuthentication/register/controller/registerController.js";
import { AuthorizationController } from "../userAuthentication/authorization/controller/authorizationController.js";
import { RecoveryPasswordController } from "../userAuthentication/recoveryPassword/controller/recoveryPasswordController.js";
import { EditProfileController } from "../userAuthentication/editProfile/controller/editProfileController.js";
export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationfield', RegisterController.validateField)
    .post('/new/user', RegisterController.userRegistration)
    .post('/user/authorization', AuthorizationController.verifyUserAuthenticity)
    .post('/user/recoveryPassword', RecoveryPasswordController.recoveryPassword)
    .post('/user/editprofile', AuthMiddleware.authentication, EditProfileController.editProfile)
