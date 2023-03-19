import { ExpenseDatabaseRepositories, UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class EditExpensesUseCases {

    static userDbRepositories = new UserDatabaseRepositories();
    static expenseDbRepositories = new ExpenseDatabaseRepositories();


    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async expenseEdit(data) {
        try {
            const userId = await this.getUserIdByHash(data.hash)
            data.info.UserId = userId
            await this.expenseDbRepositories.update(data.info, { id: data.expenseId })
            return new Response(true, "Despesa editada com sucesso!")
        } catch {
            return new ResponseError('EEUC  21L')
        }
    }
}
