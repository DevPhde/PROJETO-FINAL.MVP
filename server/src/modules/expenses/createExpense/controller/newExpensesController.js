import { NewExpensesUseCases } from "../useCases/newExpensesUseCases.js";

export class NewExpensesController extends NewExpensesUseCases {
    static createExpense = async (req, res) => {
        const data = {
            hash: req.get('authorization'),
            info: req.body
        }
        const created = await this.createNewExpense(data);
        created.status ? res.status(200).send(created) : res.status(500).send(created);
    }
}