import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Response, ResponseError } from "../../models/response/Response.js";
import { UserDatabaseRepositories } from "../../repositories/databaseRepositories.js";
dotenv.config();

export class JwtProvider {
    static userDbRepositories = new UserDatabaseRepositories();

    static async GenerateJwt(userEmail) {
        try {
            return jwt.sign({key:userEmail}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        }catch {
            return false
        }
    }

    static async JwtAssign(userEmail) {
        const token = await this.GenerateJwt(userEmail)
        const tokenAssign = token ? await this.userDbRepositories.update({hash: token}, {email: userEmail}) : false
        return tokenAssign == 1 ? new Response(true, token) : ResponseError('JWTP 21L')
    }
}