import { ExpenseDatabaseRepositories, UserDatabaseRepositories, TypeExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class ListExpensesUseCases {
    static expenseDbRepositories = new ExpenseDatabaseRepositories();
    static userDbRepositories = new UserDatabaseRepositories();
    static typeExpenseDbRepositories = new TypeExpenseDatabaseRepositories(); // verificar apos a reuniao

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async listExpenseByParam() {
        // verificar parametros na reuniao
    }

    static async listFilteredExpenses(param) {
        const userId = await this.getUserIdByHash(param)
        const data = await this.expenseDbRepositories.findAll({UserId: userId})
        return data ? new Response(true, data) : new ResponseError('LEUC 13L')
    }
}