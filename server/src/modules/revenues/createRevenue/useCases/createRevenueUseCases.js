import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class CreateRevenueUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({hash: hash})
    }

    static async createNewRevenue(data) {
        data.info.UserId = await this.getUserIdByHash(data.hash)
        const created = await this.revenueDbRepositories.create(data.info)
        return created._options.isNewRecord ? new Response(true, "Receita criada com sucesso!") : new ResponseError('CRUC 14L')
    }
}