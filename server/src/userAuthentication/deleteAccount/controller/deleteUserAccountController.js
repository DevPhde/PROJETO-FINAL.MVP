import { DeleteUserUseCases } from "../useCases/deleteUserAccountUseCases.js";

export class DeleteUserController extends DeleteUserUseCases {
    static deleteUser = async (req, res) => {
        const {authorization} = req.headers;
        // console.log(authorization)
        const deletedUser = await this.checkDelete(authorization)
        deletedUser.status ? res.status(200).send(deletedUser): res.status(500).send(deletedUser)
    }
}