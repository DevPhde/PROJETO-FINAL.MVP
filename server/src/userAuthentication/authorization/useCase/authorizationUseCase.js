import { Response } from "../../../models/response/Response.js";
import { UserDatabaseRepositories } from "../../../repositories/databaseRepositories.js";
import { PasswordProtection } from "../../../provider/bcrypt/bcryptProvider.js";

export class AuthorizationUseCase extends PasswordProtection {
    static userDbRepositories = new UserDatabaseRepositories();

    static async getUser(email) {
        return await this.userDbRepositories.findOne({ email: email });
    }

    static async validUser(data) {
        const hasUser = await this.getUser(data.email)
        if (hasUser != null) {
            return this.verifyPasswordCompatibility(data.password, hasUser.password)
        } else {
            return new Response(false, "Email ou senha incorreto.")
        }
    }

    static async verifyPasswordCompatibility(reqPassword, dbPassword) {
        const truthPassword = await this.verifyPasswordAuthenticity(reqPassword, dbPassword)
        return truthPassword ? new Response(true, "") : new Response(false, "Email ou senha incorreto.")
    }
}
//
