import { Router } from "express";
import { AuthMiddleware } from "../Middleware/authMiddleware.js";
import { RegisterController } from "../modules/user/userRegister/controller/registerController.js";
import { AuthorizationController } from "../modules/user/userAuthorization/controller/authorizationController.js";
import { RecoveryPasswordController } from "../modules/user/recoveryPassword/controller/recoveryPasswordController.js";
import { EditProfileController } from "../modules/user/editProfile/controller/editProfileController.js";
import { DeleteUserController } from "../modules/user/deleteAccount/controller/deleteUserAccountController.js";
export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationfield', RegisterController.validateField)
    .post('/new/user', RegisterController.userRegistration)
    .post('/user/authorization', AuthorizationController.verifyUserAuthenticity)
    .post('/user/recoverypassword', RecoveryPasswordController.recoveryPassword)
    .post('/user/editprofile', AuthMiddleware.authentication, EditProfileController.editProfile)
    .delete('/user/deleteaccount', AuthMiddleware.authentication, DeleteUserController.deleteUser)
