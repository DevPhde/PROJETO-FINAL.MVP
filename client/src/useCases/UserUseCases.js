import { AxiosProvider } from "../services/axiosProvider";

export class UserUseCases {

    static async recoveryUser(email) {
        const data = {
            email: "dbsmendes@gmail.com"
        }
        const connection = await AxiosProvider.post(`user/recoverypassword`, data)
        console.log(connection)
    }

    static async CreateUser(name, cpf, email, password) {
        const data = {
            name: name,
            cpf: cpf,
            email: email,
            password: password
        }
        return await AxiosProvider.post(`new/user`, data)

    }



    // }

    // static async DeleteUser(){

    // }

    // static async UpdateUser(){

    // }

}