import { UserIRUseCases } from "../useCases/userIRUseCases.js";

export class UserIRController extends UserIRUseCases {
    static calculateRevenue = async (req, res) => {
        const {authorization} = req.headers;
        const data = await this.iRCalculate(authorization)
        data.status ? res.status(200).send(data) : res.status(500).send(data);
    }
}