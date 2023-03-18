import { ExpenseDatabaseRepositories, UserDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class EditExpensesUseCases {

    static userDbRepositories = new UserDatabaseRepositories();
    static expenseDbRepositories = new ExpenseDatabaseRepositories();


    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async expenseEdit(data) {
        const userId = await this.getUserIdByHash(data.hash)
        data.info.UserId = userId
        const edited = await this.expenseDbRepositories.update(data.info, {id: data.expenseId})
        return edited == 1 ? new Response(true, "Despesa editada com sucesso!") : new ResponseError('EEUC  19L')
    }
}
