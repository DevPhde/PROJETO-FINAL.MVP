import { AxiosProvider } from "../providers/axiosProvider";

export class RevenuesUseCases extends AxiosProvider {
    static async getRevenues() {
        const hash = sessionStorage.getItem('authorization')
        const connection = await this.get('/expenses')
        console.log(connection)
    }
}