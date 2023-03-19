import { CreateRevenueUseCases } from "../useCases/createRevenueUseCases.js";

export class CreateRevenueController extends CreateRevenueUseCases {
    static createRevenue = async (req, res) => {
        const data = {
            hash: req.get('authorization'),
            info: req.body
        }
        const created = await this. createNewRevenue(data)
        created.status ? res.status(201).send(created) : res.status(500).send(created);
    }
}