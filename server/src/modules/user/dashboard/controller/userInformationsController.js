import { UserInformationsUseCases } from "../useCases/userInformationsUseCases.js";

export class UserInformationsController extends UserInformationsUseCases {
    static userInformations = async (req, res) => {
        const data = await this.getUserInformations(req.get('authorization'))
        data.status ? res.status(200).send(data) : res.status(500).send(data)
    }

    static totalValues = async (req, res) => {
        const {authorization} = req.headers;
        const data = await this.getTotalValues(authorization)
        data.status ? res.status(200).send(data) : res.status(500).send(data);
    }

    static graphStatus = async (req, res) => {
        const {authorization} = req.headers;
        const data = await this.typeExpenseTotalValues(authorization)
        data.status ? res.status(200).send(data) : res.status(500).send(data)
    }
}