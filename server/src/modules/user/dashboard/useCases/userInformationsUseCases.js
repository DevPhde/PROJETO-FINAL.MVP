import { UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class UserInformationsUseCases {
    static userDbRepositories = new UserDatabaseRepositories();

    static async getUserInformations(hash) {
        try {
            let user = await this.userDbRepositories.findOne({hash: hash})
            
            user = {
                name: user.name,
                cpf: user.cpf,
                email: user.email,
            }
            return new Response(true, user);
        } catch {
            return new ResponseError('UIUC 17L')
        }
    }
}