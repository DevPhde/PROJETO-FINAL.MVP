import { Response, ResponseError } from "../../../models/response/Response.js";
import { UserDatabaseRepositories, RevenueDatabaseRepositories } from "../../../repositories/databaseRepositories.js";
import { Op } from "sequelize";

export class UserIRUseCases {
    static userDbRepositories = new UserDatabaseRepositories();
    static revenueDbRepositories = new RevenueDatabaseRepositories();

    static async getUserIdByHash(hash) {
        return await this.userDbRepositories.findUserId({ hash: hash })
    }

    static async sumRevenues(id, year) {
        try {
            return await this.revenueDbRepositories.sum({ UserId: id, date: {
                [Op.between]: [`01-01-${year}`, ` 31-12-${year}`]
              } })
        } catch(e) {
            return 0
        }
    }

    static async iRCalculate(data) {
        try {
            const userId = await this.getUserIdByHash(data)
            const date = new Date().getFullYear();
            const sumRevenues = await this.sumRevenues(userId , date)
            const aliquotAndDeduct = sumRevenues <= 22847.76 ? {aliquot: 'Isento', installmentToDeduct: 0} : sumRevenues >= 22847.77 && sumRevenues <= 33919.80 ? { aliquot: 7.5, installmentToDeduct: 1713.58 } : sumRevenues >= 33919.81 && sumRevenues <= 45012.60 ? { aliquot: 15, installmentToDeduct: 4257.57 } : sumRevenues >= 45012.61 && sumRevenues <= 55976.16 ? { aliquot: 22.5, installmentToDeduct: 7633.51 }  : { aliquot: 27.5, installmentToDeduct: 10432.32 }    
            data = {
                    totalRevenues: sumRevenues,
                    aliquot: aliquotAndDeduct.aliquot,
                    deduct: aliquotAndDeduct.installmentToDeduct,
                    dueTax: aliquotAndDeduct.installmentToDeduct != 0 ? (sumRevenues * aliquotAndDeduct.aliquot /  100) - aliquotAndDeduct.installmentToDeduct : 'Isento de imposto'
                }
            return new Response(true, data)
        } catch {
            return new ResponseError('IR 34L')
        }
    }
}