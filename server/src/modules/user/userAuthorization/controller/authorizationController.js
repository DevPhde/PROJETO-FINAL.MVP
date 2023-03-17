import { AuthorizationUseCases } from "../useCases/authorizationUseCases.js";
import { ResponseError } from "../../../../models/response/Response.js";
import { JwtProvider } from "../../../../provider/jwt/jsonWebTokenProvider.js";

export class AuthorizationController extends AuthorizationUseCases {
    static verifyUserAuthenticity = async (req, res) => {
        const data = req.body;
        const verifiedUser = await this.validUser(data);
        if (verifiedUser.status) {
            try {
                const jwt = await this.releaseUser(data.email)
                jwt.status ? res.status(200).send(jwt) : res.status(500).send(jwt)
            } catch {
                res.status(500).send(new ResponseError('AC 15L'))
            }
        } else {
            res.status(401).send(verifiedUser)
        }
    }

    static async releaseUser(email) {
        const user = await this.getUser(email);
        try {
           return await JwtProvider.jwtAssign(user.email)
        } catch {
            return new ResponseError('AC 27L | JWTP 20L')
        }
    }
}