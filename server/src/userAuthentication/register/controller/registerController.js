import { Response } from "../../../models/response/Response.js"
import { RegisterUseCases } from "../useCases/registerUseCases.js";
import { PasswordProtection } from "../../../provider/bcrypt/bcryptProvider.js";
import { ResponseError } from "../../../models/response/Response.js";


export class RegisterController extends RegisterUseCases {

    static ValidateField = async (req, res) => {
        const data = await this.userDbRepositories.findOne(req.body);
        data == null ? res.status(200).send(new Response(true)) : res.status(409).send(new Response(false, "Campo já existente."));
    }
    static UserRegistration = async (req, res) => {
        const data = req.body;
        const VerifyRegistration = await this.VerifyNewUser(data)
        if (VerifyRegistration != true) {
            res.status(409).send(new Response(false, VerifyRegistration))
        } else {
            const protectedPassword = await PasswordProtection.passwordCryptography(data.password);
            data.password = protectedPassword
            const register = await this.userDbRepositories.create(data)
            register._options.isNewRecord ? res.status(200).send(new Response(true, "Usuário criado com sucesso!")) : res.status(500).send(new ResponseError('RC 24L'));
        }
    }
}