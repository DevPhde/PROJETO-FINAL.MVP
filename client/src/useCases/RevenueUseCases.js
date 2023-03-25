import { AxiosProvider } from "../services/axiosProvider";

export class RevenueUseCases {

    static async CreateRevenue(date, name, amout) {
        try {
            const revenue = new Revenue(date, name, amout)
            const data = await AxiosProvider.Post('new/revenues', revenue)
            return data
        } catch (err) {
            return err.response.data
        }}

        // static async CreateUser(){

        // }

        // static async DeleteUser(){


        // }

        // static async UpdateUser(){

        // }

    }