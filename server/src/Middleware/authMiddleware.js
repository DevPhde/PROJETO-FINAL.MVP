import { JwtProvider } from "../provider/jwt/jsonWebTokenProvider.js";

import dotenv from "dotenv";
dotenv.config();


export class AuthMiddleware extends JwtProvider {

    static authentication = async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send('Token Expired');
        }

        try {
            await this.verifyToken(authorization) ? next() : res.status(401).send('Token Expired')
        } catch {
            res.status(401).send('Token Expired')
        }
    }
}
