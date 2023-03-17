import { Response, ResponseError } from "../../../models/response/Response.js";
import { UserDatabaseRepositories, ExpenseDatabaseRepositories, RevenueDatabaseRepositories } from "../../../repositories/databaseRepositories.js";

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
        const user = await this.findUserByHash(hash)
        const deletedUser = await this.handleDeleteUser(user.id)
        if (deletedUser) {
            const deletedExpenses = await this.deleteExpenses(user.id)
            if (deletedExpenses || deletedExpenses == 0) {
                const deletedRevenues = await this.deleteRevenues(user.id);
                if (deletedRevenues || deletedRevenues == 0) {
                    return new Response(true, "Conta deletada com sucesso!")
                } else {
                    return new ResponseError('DUA 38L (ERRO CRÍTICO, CONTATE O SUPORTE.)')
                }
            } else {
                return new ResponseError('DUA 38L (ERRO CRÍTICO, CONTATE O SUPORTE.)')
            }
        } else {
            return new ResponseError('DUA 38L (ERRO CRÍTICO, CONTATE O SUPORTE.)')
        }
    }
}