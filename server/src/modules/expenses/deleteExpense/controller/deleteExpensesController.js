import { DeleteExpensesUseCases } from "../useCases/deleteExpensesUseCases.js";

export class DeleteExpensesController extends DeleteExpensesUseCases {
    static deleteExpense = async (req, res) => {
        const expenseId = req.params.id
        const deletedExpense = await this.expenseDelete(expenseId)
        deletedExpense.status ? res.status(200).send(deletedExpense) : res.status(500).send(deletedExpense)
    }
}