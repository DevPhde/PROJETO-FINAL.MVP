import { Router } from "express";
import { Register } from "../authentication/register/controller/registerController.js";

export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validationField', Register.ValidField)
