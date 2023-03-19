import { DeleteRevenuesUseCases } from "../useCases/deleteRevenuesUseCases.js";

export class DeleteRevenuesController extends DeleteRevenuesUseCases {
    static deleteRevenue = async (req, res) => {
        const revenueId = req.params.id;
        const deletedRevenue = await this.revenueDelete(revenueId);
        deletedRevenue.status ? res.status(200).send(deletedRevenue) : res.status(500).send(deletedRevenue);
    }
}