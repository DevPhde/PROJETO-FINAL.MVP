import { User } from "../models/User.js"
import { Expense } from "../models/Expense.js"

export class GetByParam {

    static async GetUser(param) {
        return await User.findOne({ where: param })

    }
    static async GetExpense() {
        return await Expense.findOne({ where: param })
    }
}