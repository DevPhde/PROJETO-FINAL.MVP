import { ExpenseDatabaseRepositories, UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class NewExpensesUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static expenseDbRepositories = new ExpenseDatabaseRepositories();


    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({hash: hash})
    }

    static async createNewExpense(data) {
        const userId = await this.getUserIdByHash(data.hash)
        data.info.UserId = userId
        const created = await this.expenseDbRepositories.create(data.info)
        return created._options.isNewRecord ? new Response(true, "Despesa criada com sucesso!") : new ResponseError('NEUC 10L')
    }
}
