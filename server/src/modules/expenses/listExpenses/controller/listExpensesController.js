import { ListExpensesUseCases } from "../useCases/listExpensesUseCases.js";

export class ListExpensesController extends ListExpensesUseCases {
    static listExpenses = async (req, res) => {
        const {authorization} = req.headers;
        
        const list = await this.listFilteredExpenses(authorization)
        list.status ? res.status(200).send(list) : res.status(500).send(list)
    }
}