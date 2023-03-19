import { UserInformationsUseCases } from "../useCases/userInformationsUseCases.js";

export class UserInformationsController extends UserInformationsUseCases {
    static userInformations = async (req, res) => {
        const data = await this.getUserInformations(req.get('authorization'))
        console.log(data)
        data.status ? res.status(200).send(data) : res.status(500).send(data)
    }
}