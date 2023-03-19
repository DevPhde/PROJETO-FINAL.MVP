import { Response,ResponseError } from "../../../../models/response/Response.js";
import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";

export class ListRevenuesUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenuesDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({hash: hash})
    }

    static async listFilteredExpenses(param) {
        const userId = await this.getUserIdByHash(param)
        const data = await this.revenuesDbRepositories.findAll({UserId: userId})
        return data ? new Response(true, data) : new ResponseError('LRUC 15L')
    }
}