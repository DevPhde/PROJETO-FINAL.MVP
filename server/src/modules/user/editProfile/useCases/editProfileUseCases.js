import { PasswordProtection } from "../../../../provider/bcrypt/bcryptProvider.js";
import { UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";


export class EditProfileUseCases extends PasswordProtection  {
    static userDbRepositories = new UserDatabaseRepositories();

    static async verifyEdit(data) {
        try {
            if (data.info.password) {
                data.info.password = await this.passwordCryptography(data.info.password)
            }
            await this.userDbRepositories.update(data.info, {hash: data.authorization})
            return new Response(true, 'Informações atualizadas com sucesso!');
        } catch {
            return new ResponseError('ePUC 14L')
        }
    }
}