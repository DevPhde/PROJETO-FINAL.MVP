import { recoveryPasswordUseCase } from "../useCase/recoveryPasswordUseCase.js";
import { Mailer } from "../../../provider/mailer/MailProvider.js";
import { Response, ResponseError } from "../../../models/response/Response.js";

export class recoveryPasswordController extends recoveryPasswordUseCase {

    static mailer = new Mailer();

    static recoveryPassword = async (req, res) => {
        const data = req.body;
        // const newPassword = await this.teste()
        const newPassword = await this.verifyRecoveryPassword(data);
        console.log(newPassword)
        const sendNewPassword =  newPassword.status ? await this.mailer.sendMail("recoveryPassword", data, `
Foi solicitado uma recuperação de senha. Segue abaixo sua nova senha:
    Senha: ${newPassword.message}`) : res.status(409).send(newPassword);
        console.log(sendNewPassword)
        sendNewPassword ? res.status(200).send(new Response(true, "Nova senha enviada para o email cadastrado.")) : res.status(500).send(new ResponseError('Erro Crítico RPC 16L, contate o suporte.'))
    }
}