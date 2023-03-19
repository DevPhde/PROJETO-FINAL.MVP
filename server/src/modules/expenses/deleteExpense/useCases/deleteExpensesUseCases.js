import { ExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class DeleteExpensesUseCases {
    static expenseDbRepositories = new ExpenseDatabaseRepositories();

    static async expenseDelete(id) {
        try {
            await this.expenseDbRepositories.destroy({id: id})
            return new Response(true, "Despesa deletada com sucesso!")
        } catch {
            return new  ResponseError('DUC 12L')
        }     
    }
}