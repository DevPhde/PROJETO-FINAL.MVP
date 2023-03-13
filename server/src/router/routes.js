import { Router } from "express";
import { RegisterController } from "../authentication/register/controller/registerController.js";

export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationField', RegisterController.ValidateField)
    .post('/new/user', RegisterController.UserRegistration)
