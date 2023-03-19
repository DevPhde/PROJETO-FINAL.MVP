import { Response, ResponseError } from "../../../../models/response/Response.js";
import { RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";

export class DeleteRevenuesUseCases {
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async revenueDelete(id) {
        try {
            await this.revenueDbRepositories.destroy({id: id})
            return new Response(true, "Receita deletada com sucesso!")
        } catch {
            return new ResponseError('DRUC 12L')
        }
    }
}