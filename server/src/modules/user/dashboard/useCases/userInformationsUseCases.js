import { UserDatabaseRepositories, TypeExpenseDatabaseRepositories, RevenueDatabaseRepositories, ExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";
import { TypeExpensesUseCases } from "../../../expenses/typeExpense/useCases/typeExpensesUseCases.js";

export class UserInformationsUseCases extends TypeExpensesUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static typeExpenseDbRepositories = new TypeExpenseDatabaseRepositories();
    static expenseDbRepositories = new ExpenseDatabaseRepositories();
    static revenuesDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async sumRevenues(id) {
        try {
            return await this.revenuesDbRepositories.sum({ UserId: id })
        } catch {
            return 0
        }
    }

    static async sumExpenses(id) {
        try {
            return await this.expenseDbRepositories.sum({ UserId: id })
        } catch {
            return 0
        }
    }

    static async sumExpensesByTypeExpenses(id, type) {
        try {
            return await this.expenseDbRepositories.sum({ UserId: id, TypeExpenseId: type })
        } catch {
            return 0
        }
    }

    static async getUserInformations(hash) {
        try {
            let user = await this.userDbRepositories.findOne({ hash: hash })
            user = {
                name: user.name,
                cpf: user.cpf,
                email: user.email,
            }
            return new Response(true, user);
        } catch {
            return new ResponseError('UIUC 17L')
        }
    }

    static async getTotalValues(hash) {
        try {
            const userId = await this.getUserIdByHash(hash)
            const expenses = await this.sumExpenses(userId)
            const revenues = await this.sumRevenues(userId)
            const data = {
                expenses: expenses || 0,
                revenues: revenues || 0
            }
            return new Response(true, data)
        } catch {
            return new ResponseError('UIUC 55L')
        }
    }

    static async typeExpenseTotalValues(hash) {
        try {
            const userId = await this.getUserIdByHash(hash)
            const values = await this.listTypes()
            const id = values.message.map(i => {
                return { id: i.id, name: i.name }
            })

            const total = await Promise.all(id.map(async (i) => {
                const data = await this.sumExpensesByTypeExpenses(userId, i.id)
                const result = { id: i.id, name: i.name, total: data || 0 }
                console.log(result)
                return result
            }))
            return new Response(true, total)
        } catch {
            return new ResponseError('UIUC 85L')
        }
    }
}