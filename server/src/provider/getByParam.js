import { User } from "../models/User.js"
import {Expense} from "../models/Expense.js"

export class GetByParam {
    
    static async GetUser(param) {
        const data = await User.findOne({where: param})
    }
    static async GetExpense() {
        const data = await Expense.findOne({where: param})
    }
}