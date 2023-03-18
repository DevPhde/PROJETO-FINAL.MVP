import { EditExpensesUseCases } from "../useCases/editExpensesUseCases.js";

export class EditExpensesController extends EditExpensesUseCases {
        static editExpense = async (req, res) => {
            const data = {
                hash: req.get('authorization'),
                expenseId: req.params.id,
                info: req.body
            }
            const edited = await this.expenseEdit(data)
            edited.status ? res.status(200).send(edited) : res.status(500).send(edited)
        }
}