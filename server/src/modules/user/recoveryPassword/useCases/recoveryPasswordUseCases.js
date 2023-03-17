import { UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";
import { passwordGeneratorProvider } from "../../../../provider/passwordGenerator/passwordGeneratorProvider.js";
import { Logger } from "../../../../helper/logger/consoleLogger.js";
import { PasswordProtection } from "../../../../provider/bcrypt/bcryptProvider.js";


export class RecoveryPasswordUseCases extends PasswordProtection {
    static userDbRepositories = new UserDatabaseRepositories();

    static async getUserInformations(email) {
        return await this.userDbRepositories.findOne(email)
    }

    static async verifyRecoveryPassword(email) {
        const user = await this.getUserInformations(email)
        return user != null ? await this.newPassword(user) : new Response(false, "Email inválido.")
    }

    static async newPassword(user) {
        const password = passwordGeneratorProvider();
        const securePassword = await this.passwordCryptography(password)
        const updatedPassword = await this.userDbRepositories.update({ password: securePassword }, { id: user.id });
        return updatedPassword == 1 ? new Response(true, password) : new ResponseError('RPUC 21L');
    }
}