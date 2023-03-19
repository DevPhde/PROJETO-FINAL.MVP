import { TypeExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";

export class TypeExpensesUseCases {
    static typeExpensesDbRepositories = new TypeExpenseDatabaseRepositories();

    static async getTypeExpenseByName(value) {
        return await this.typeExpensesDbRepositories.findOne(value)
    }

    static async createNewType(data) {
        const validCreate = await this.getTypeExpenseByName(data)
        if(validCreate == null) {
            try {
                await this.typeExpensesDbRepositories.create(data)
                return new Response(true, "Tipo de despesa criada com sucesso!")
            } catch {
                return new ResponseError('TUC 18L')
            }
        } else {
            return new Response(false, "Tipo de despesa já existente.")
        }
        
    }

    static async listTypes() {
        const data = await this.typeExpensesDbRepositories.findAll()
        return data ? new Response(true, data) : new ResponseError('TUC 28L')
    }

    static async deleteType(value) {
        try {
            await this.typeExpensesDbRepositories.destroy({id: value})
            return new Response(true, "Tipo de despesa deletado com sucesso!")
        } catch {
            return new ResponseError('TUC 36L')
        }
    }   
}
