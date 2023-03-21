import { ExpenseDatabaseRepositories, UserDatabaseRepositories, TypeExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";
import { TypeExpense } from "../../../../models/TypeExpense.js";
export class ListExpensesUseCases {
    static expenseDbRepositories = new ExpenseDatabaseRepositories();
    static userDbRepositories = new UserDatabaseRepositories();
    static typeExpenseDbRepositories = new TypeExpenseDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async listFilteredExpenses(param) {
        try {
            const userId = await this.getUserIdByHash(param)
            const data = await this.expenseDbRepositories.joinFindAll({
                where: { UserId: userId },
                include: {
                    model: TypeExpense,
                    as: 'TypeExpense',
                    attributes: ['name']
                }
            })
            return new Response(true, data)
        } catch(err) {
            return new ResponseError('LEUC 23L')
        }
    }
}