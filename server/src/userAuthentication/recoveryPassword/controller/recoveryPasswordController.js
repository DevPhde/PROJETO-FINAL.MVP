import { RecoveryPasswordUseCases } from "../useCases/recoveryPasswordUseCases.js";
import { Mailer } from "../../../provider/mailer/mailProvider.js";
import { Response, ResponseError } from "../../../models/response/Response.js";

export class RecoveryPasswordController extends RecoveryPasswordUseCases {

    static mailer = new Mailer();

    static recoveryPassword = async (req, res) => {
        const data = req.body;
        const newPassword = await this.verifyrecoveryPassword(data);
        const sendnewPassword =  newPassword.status ? await this.mailer.sendMail("recoveryPassword", data, `
Foi solicitada uma recuperação de senha. Segue abaixo sua nova senha:

Senha: ${newPassword.message}`) : res.status(401).send(newPassword);
        sendnewPassword ? res.status(200).send(new Response(true, "Nova senha enviada para o email cadastrado.")) : res.status(500).send(new ResponseError('Erro Crítico RPC 16L, contate o suporte.'))
    }
}