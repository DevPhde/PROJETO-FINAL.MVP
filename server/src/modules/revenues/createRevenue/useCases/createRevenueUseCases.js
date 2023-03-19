import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class CreateRevenueUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async createNewRevenue(data) {
        try {
            data.info.UserId = await this.getUserIdByHash(data.hash)
            await this.revenueDbRepositories.create(data.info)
            return new Response(true, "Receita criada com sucesso!")
        } catch {
            return new ResponseError('CRUC 18L')
        }
    }
}