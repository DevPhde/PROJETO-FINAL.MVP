import { UserDatabaseUseCase } from "../../../provider/dataBaseUseCases.js";
import { Response } from "../../../models/response/Response.js"
import { RegistrationUseCase } from "../useCase/registerUseCase.js";
import { PasswordProtection } from "../../provider/PasswordProtection.js";

const userDbUseCase = new UserDatabaseUseCase();

export class RegisterController {
    static ValidateField = async (req, res) => {
        const data = await userDbUseCase.findOne(req.body);
        data == null ? res.status(200).send(new Response(true)) : res.status(409).send(new Response(false, "Campo já existente."));
    }
    static UserRegistration = async (req, res) => {
        const data = req.body;
        const VerifyRegistration = await RegistrationUseCase.VerifyNewUser(data)
        if(VerifyRegistration != true){
            res.status(409).send(new Response(false, VerifyRegistration))
        } else {
            const protectedPassword = await PasswordProtection.passwordCryptography(data.password);
            data.password = protectedPassword
            const register = await userDbUseCase.create(data)
            register._options.isNewRecord ? res.status(200).send(new Response(true, "Usuário criado com sucesso!")) : res.status(500).send("Erro interno, tente novamente mais tarde. (error code: RC 20L)")
        }
    }
}