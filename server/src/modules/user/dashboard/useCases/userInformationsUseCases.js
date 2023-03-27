import { UserDatabaseRepositories, TypeExpenseDatabaseRepositories, RevenueDatabaseRepositories, ExpenseDatabaseRepositories } from "../../../../repositories/databaseRepositories.js";
import { Response, ResponseError } from "../../../../models/response/Response.js";
import { TypeExpensesUseCases } from "../../../expenses/typeExpense/useCases/typeExpensesUseCases.js";
import { Op } from "sequelize";
import moment from "moment/moment.js";

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
                return result
            }))
            return new Response(true, total)
        } catch {
            return new ResponseError('UIUC 85L')
        }
    }

    static async getTotalByMonth(param, authorization) {

        try {
            const userId = await this.getUserIdByHash(authorization);
            const today = moment();
            const year = today.year().toString();
            const month = (today.month() + 1).toString().padStart(2, '0');

            const startDate = moment(`01-${month}-${year}`, 'DD-MM-YYYY').toDate();
            const endDate = moment(`31-${month}-${year}`, 'DD-MM-YYYY').toDate();
            let data
            if (param == 'revenues') {
                data = await this.revenuesDbRepositories.sum({
                    UserId: userId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                });
            } else {
                data = await this.expenseDbRepositories.sum({
                    UserId: userId,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                });
            }
            if (data == null) data = 0
            return new Response(true, { totalValue: data })
        } catch {
            return new ResponseError('UIUC 118L')
        }
    }

    static async getLastItem(param, authorization) {
        try {
            const userId = await this.getUserIdByHash(authorization)
            let data = param == 'revenues' ? await this.revenuesDbRepositories.findLastOne({ userId: userId }) : await this.expenseDbRepositories.findLastOne({ userId: userId });
            return new Response(true, data)
        } catch {
            return new ResponseError('UIUC 128L')
        }
    }

    static async getSumByMonth(param, authorization) {
        try {
            const userId = await this.getUserIdByHash(authorization)
            const result = param == 'revenues' ? await this.revenuesDbRepositories.sumByMonth({userId: userId}) : await this.expenseDbRepositories.sumByMonth({userId: userId});
            const data = result.map(i => {
                {
                    return i.dataValues
                }
            })
            return new Response(true, data)
        } catch(e) {
            return new ResponseError('UIUC 144L')
        }
    }
}