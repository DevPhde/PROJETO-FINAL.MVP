import { Response, ResponseError } from "../../../../models/response/Response.js"
import { RegisterUseCases } from "../useCases/registerUseCases.js";
import { PasswordProtection } from "../../../../provider/bcrypt/bcryptProvider.js";


export class RegisterController extends RegisterUseCases {

    static validateField = async (req, res) => {
        try {
            const data = await this.userDbRepositories.findOne(req.body);
            data == null ? res.status(200).send(new Response(true)) : res.status(409).send(new Response(false, "Campo já existente."));
        } catch {
            return res.status(500).send(new ResponseError('RC 13L'))
        }

    }
    static userRegistration = async (req, res) => {
        try {
            const data = req.body;
            const VerifyRegistration = await this.verifyNewUser(data)
            if (VerifyRegistration != true) {
                res.status(409).send(new Response(false, VerifyRegistration))
            } else {
                data.password = await PasswordProtection.passwordCryptography(data.password);
                await this.userDbRepositories.create(data)
                return res.status(201).send(new Response(true, "Usuário criado com sucesso!"))
            }
        } catch {
            return res.status(500).send(new ResponseError('RC 24L'));
        }

    }
}