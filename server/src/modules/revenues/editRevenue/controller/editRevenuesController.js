import { EditRevenuesUseCases } from "../../listRevenues/editRevenuesUseCases.js"

export class EditRevenuesController extends EditRevenuesUseCases {
    static editRevenue = async (req, res) => {
        const data = {
            expenseId: req.params.id,
            info: req.body
        };
        const edited = await this.revenueEdit(data);
        edited.status ? res.status(200).send(edited) : res.status(500).send(edited);
    }
}