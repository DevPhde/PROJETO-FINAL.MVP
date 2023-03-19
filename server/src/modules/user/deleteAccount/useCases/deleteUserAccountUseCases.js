import { Response, ResponseError } from "../../../../models/response/Response.js";
import { UserDatabaseRepositories, ExpenseDatabaseRepositories, RevenueDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";

export class DeleteUserUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static expenseDbRepositories = new ExpenseDatabaseRepositories();
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async findUserByHash(hash) {
        return await this.userDbRepositories.findOne({ hash: hash })
    }

    static async deleteExpenses(id) {
        try {
            return await this.expenseDbRepositories.destroy({ UserId: id })
        } catch {
            return false
        }
    }

    static async deleteRevenues(id) {
        try {
            return await this.revenueDbRepositories.destroy({ UserId: id })
        } catch {
            return false
        }
    }

    static async handleDeleteUser(id) {
        try {
            return await this.userDbRepositories.destroy({ id: id })
        } catch {
            return false
        }
    }

    static async checkDelete(hash) {

        try {
            const user = await this.findUserByHash(hash)
            await this.handleDeleteUser(user.id)
            await this.deleteRevenues(user.id);
            await this.deleteExpenses(user.id)
            return new Response(true, "Conta deletada com sucesso!")
        } catch {
            return new ResponseError('DUA 46L (ERRO CRÍTICO, CONTATE O SUPORTE.)')
        }
    }
}