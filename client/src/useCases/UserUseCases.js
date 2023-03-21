import { AxiosProvider } from "../providers/axiosProvider";

export class UserUseCases {

    static async recoveryUser(email) {
        try {
           const data = await AxiosProvider.post(`user/recoverypassword`, { email: email })
           return data.data
        } catch(err) {
            return err.response.data
        }
    }

    // static async CreateUser(){

    // }

    // static async DeleteUser(){

    // }

    // static async UpdateUser(){

    // }

}