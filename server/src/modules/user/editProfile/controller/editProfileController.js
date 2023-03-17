import { EditProfileUseCases } from "../useCases/editProfileUseCases.js";


export class EditProfileController extends EditProfileUseCases {
    static editProfile = async (req, res) => {
        const data = {
            authorization: req.headers['authorization'],
            info: req.body
        }
        const userEdited = await this.verifyEdit(data)
        userEdited.status ? res.status(200).send(userEdited) : res.status(500).send(userEdited)
    }
}