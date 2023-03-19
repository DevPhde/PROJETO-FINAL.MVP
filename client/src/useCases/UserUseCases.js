import { AxiosProvider } from "../services/axiosProvider";

export class UserUseCases {

    static async recoveryUser(email){
        const data = {
            email: email
        }
        const connection = await AxiosProvider.post(`user/recoverypassword`, data)
        console.log(connection)
    }

    // static async CreateUser(){

    // }

    // static async DeleteUser(){
        
    // }

    // static async UpdateUser(){
        
    // }

}