import { Response,ResponseError } from "../../../../models/response/Response.js";
import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";

export class ListRevenuesUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenuesDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({hash: hash})
    }

    static async listFilteredExpenses(param) {
        try {
            const userId = await this.getUserIdByHash(param)
            const data = await this.revenuesDbRepositories.findAll({UserId: userId})
            return new Response(true, data)
        } catch {
            return new ResponseError('LRUC 18L')
        }
    }
}