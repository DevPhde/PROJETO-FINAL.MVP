import { GetByParam } from "../../../provider/getByParam.js"
import { Response } from "../../../models/response/Response.js"
import { Registration } from "./Registration/Registration.js";
import { PasswordProtection } from "../../provider/PasswordProtection.js";
import { User } from "../../../models/User.js";

export class Register {
    static ValidField = async (req, res) => {
        const data = await GetByParam.GetUser(req.body);
        data == null ? res.status(200).send(new Response(true)) : res.status(409).send(new Response(false, "Campo já existente."));
    }
    static Registration = async (req, res) => {
        const data = req.body;
        const VerifyRegistration = await Registration.NewUser(data)
        if(VerifyRegistration != true){
            res.status(409).send(new Response(false, VerifyRegistration))
        } else {
            const protectedPassword = await PasswordProtection.passwordCryptography(data.password);
            data.password = protectedPassword
            const register = await User.create(data)
            register._options.isNewRecord ? res.status(200).send(new Response(true, "Usuário criado com sucesso!")) : res.status(500).send("Erro interno, tente novamente mais tarde. (error code: RC 20L)")
        }
    }
}