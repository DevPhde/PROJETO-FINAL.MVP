import { ListRevenuesUseCases } from "../useCases/listRevenuesUseCases.js";

export class ListRevenuesController extends ListRevenuesUseCases {
    static listRevenues = async (req, res) => {
        const {authorization} = req.headers;

        const list = await this.listFilteredExpenses(authorization)
        list.status ? res.status(200).send(list) : res.status(500).send(list);
    }
}