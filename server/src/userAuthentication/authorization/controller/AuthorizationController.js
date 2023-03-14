import { AuthorizationUseCase } from "../useCase/AuthorizationUseCase.js";
import { ResponseError } from "../../../models/response/Response.js";
import { JwtProvider } from "../../../provider/jwt/jsonWebTokenProvider.js";

export class AuthorizationController extends AuthorizationUseCase {
    static VerifyUserAuthenticity = async (req, res) => {
        const data = req.body;
        const verifiedUser = await this.validUser(data);
        console.log(verifiedUser)

        if (verifiedUser.status) {
            verifiedUser.message = await this.ReleaseUser(data.email)
            console.log(verifiedUser)
        } else {
            res.status(500).send(new ResponseError('AC 13L'))
        }
    }

    static async ReleaseUser(email) {
        const user = await this.CatchUser(email);
        try {
            JwtProvider.JwtAssign()

        } catch {
            console.error('error')
        }
        console.log(user)
    }
}