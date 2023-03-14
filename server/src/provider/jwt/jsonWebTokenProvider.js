import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Response, ResponseError } from "../../models/response/Response.js";
import { UserDatabaseProvider } from "../databaseProvider.js";
dotenv.config();

export class JwtProvider {
    static userDbUseCases = new UserDatabaseProvider();

    static async GenerateJwt(userEmail) {
        try {
            return jwt.sign({key:userEmail}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        }catch {
            return false
        }
    }

    static async JwtAssign(userEmail) {
        const token = await this.GenerateJwt(userEmail)
        const tokenAssign = token ? await this.userDbUseCases.update({hash: token}, {email: userEmail}) : false
        return tokenAssign == 1 ? new Response(true, token) : ResponseError('JWTP 21L')
    }
}