import { ExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class DeleteExpensesUseCases {
    static expenseDbRepositories = new ExpenseDatabaseRepositories();

    static async expenseDelete(id) {
        return await this.expenseDbRepositories.destroy({id: id}) == 1 ? new Response(true, "Despesa deletada com sucesso!") : new  ResponseError('DUC 8L')
       
    }
}