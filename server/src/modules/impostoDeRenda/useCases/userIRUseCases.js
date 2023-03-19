import { Response, ResponseError } from "../../../models/response/Response.js";
import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../repositories/databaseRepositories.js";

export class UserIRUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({hash: hash})
    }

    static async sumRevenues(id) {
        try {
            return await this.revenueDbRepositories.sum({UserId: id})
        } catch {
            return 0
        }
    }

    static async iRCalculate(data) {
        try {
            const userId = await this.getUserIdByHash(data)
            const sumRevenues = await this.sumRevenues(userId)
            const defineAliquot = sumRevenues <= 22847.76 ? 'isento' : sumRevenues >= 22847.77 && sumRevenues <= 33919.80 ? '7.5%' : sumRevenues >= 33919.81 && sumRevenues <= 45012.60 ? '15%' : sumRevenues >= 45012.61 && sumRevenues <= 55976.16 ? '22.5%' : '27.5'
            data = {
                value: sumRevenues,
                aliquot: defineAliquot
            }
            return new Response(true, data)
        } catch {
            return new ResponseError('IR 27L')
        }
    }
}