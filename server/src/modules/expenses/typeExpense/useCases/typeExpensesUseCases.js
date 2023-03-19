import { TypeExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class TypeExpensesUseCases {
    static typeExpensesDbRepositories = new TypeExpenseDatabaseRepositories();

    static async getTypeExpenseByName(value) { //  ex de value => {id: 1} || {name: mercado}
        return await this.typeExpensesDbRepositories.findOne(value)
    }

    static async createNewType(data) {
        const validCreate = await this.getTypeExpenseByName(data)
        if(validCreate == null) {
            const created = await this.typeExpensesDbRepositories.create(data)
            return created._options.isNewRecord ? new Response(true, "Tipo de despesa criada com sucesso!") : new ResponseError('TUC 13L')
        } else {
            return new Response(false, "Tipo de despesa já existente.")
        }
        
    }

    static async listTypes() {
        const data = await this.typeExpensesDbRepositories.findAll()
        return data ? new Response(true, data) : new ResponseError('TUC 17L')
    }

    static async deleteType(value) {
        const deleted = await this.typeExpensesDbRepositories.destroy({id: value})
        return deleted >= 1 ? new Response(true, "Tipo de despesa deletado com sucesso!") : new ResponseError('TUC 29L')
    }   
}
