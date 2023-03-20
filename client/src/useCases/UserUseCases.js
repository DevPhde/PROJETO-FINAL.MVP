import { AxiosProvider } from "../services/axiosProvider";

export class UserUseCases {

    static async recoveryUser(email){
        const data = {
            email: "dbsmendes@gmail.com"
        }
        const connection = await AxiosProvider.post(`user/recoverypassword`, data)
        console.log(connection)
    }

    static async Login(email,password){
        const data = {
            email:email,
            password:password
        }
        return await AxiosProvider.post(`user/authorization`, data);
       
        

     
    }

    // static async CreateUser(){

    // }

    // static async DeleteUser(){
        
    // }

    // static async UpdateUser(){
        
    // }

}