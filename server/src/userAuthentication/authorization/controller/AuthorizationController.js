import { AuthorizationUseCase } from "../useCase/AuthorizationUseCase.js";
import { ResponseError } from "../../../models/response/Response.js";
import { JwtProvider } from "../../../provider/jwt/jsonWebTokenProvider.js";

export class AuthorizationController extends AuthorizationUseCase {
    static VerifyUserAuthenticity = async (req, res) => {
        const data = req.body;
        const verifiedUser = await this.validUser(data);
        if (verifiedUser.status) {
            try {
                const jwt = await this.ReleaseUser(data.email)
                jwt.status ? res.status(200).send(jwt) : res.status(500).send(jwt)
            } catch {
                res.status(500).send(new ResponseError('AC 15L'))
            }
        } else {
            res.status(409).send(verifiedUser)
        }
    }

    static async ReleaseUser(email) {
        const user = await this.CatchUser(email);
        try {
           return await JwtProvider.JwtAssign(user.email)
        } catch {
            return new ResponseError('AC 27L | JWTP 20L')
        }
    }
}