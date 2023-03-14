import { Response } from "../../../models/response/Response.js";
import { UserDatabaseProvider } from "../../../provider/databaseProvider.js";
import { PasswordProtection } from "../../userAuthenticationProvider/PasswordProtection.js";

export class AuthorizationUseCase {
    static userDbUseCases = new UserDatabaseProvider();

    static async CatchUser(email) {
        return await this.userDbUseCases.findOne({ email: email });
    }

    static async validUser(data) {
        const hasUser = await this.CatchUser(data.email)
        if (hasUser != null) {
            return this.verifyPasswordCompatibility(data.password, hasUser.password)
        } else {
            return new Response(false, "Email ou senha incorreto.")
        }
    }

    static async verifyPasswordCompatibility(reqPassword, dbPassword) {
        const truthPassword = await PasswordProtection.verifyPasswordAuthenticity(reqPassword, dbPassword)
        return truthPassword ? new Response(true, "") : new Response(false, "Email ou senha incorreto.")
    }
}