import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export class JwtProvider {
    static async GenerateJwt(userEmail) {

    }

    static async JwtAssign(user) {
        const token = this.GenerateJwt(user.email)
    }

    static async RemoveToken() {

    }
}