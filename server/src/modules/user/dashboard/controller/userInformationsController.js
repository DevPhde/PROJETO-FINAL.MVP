import { UserInformationsUseCases } from "../useCases/userInformationsUseCases.js";

export class UserInformationsController extends UserInformationsUseCases {
    static userInformations = async (req, res) => {
        const data = await this.getUserInformations(req.get('authorization'))
        data.status ? res.status(200).send(data) : res.status(500).send(data)
    }

    static totalValues = async (req, res) => {
        const {authorization} = req.headers;
        const data = await this.getTotalValues(authorization)
        data.status ? res.status(200).send(data) : res.status(500).send(data);
    }

    static graphStatus = async (req, res) => {
        const {authorization} = req.headers;
        const data = await this.typeExpenseTotalValues(authorization)
        data.status ? res.status(200).send(data) : res.status(500).send(data)
    }

    static getMonthlyTotal = async (req, res) => {
        const param = req.params.param;
        const {authorization} = req.headers;
        const getTotal = await this.getTotalByMonth(param, authorization)
        getTotal.status ? res.status(200).send(getTotal) : res.status(500).send(getTotal);
    }
    static lastRegisteredItem = async (req, res) => {
        const param = req.params.param;
        const {authorization} = req.headers;
        const getLast = await this.getLastItem(param, authorization)
        getLast.status ? res.status(200).send(getLast) : res.status(500).send(getLast);
    }
    static getMonthlySum = async (req, res) => {
        const param = req.params.param;
        const {authorization} = req.headers;
        const getSum = await this.getSumByMonth(param, authorization);
        getSum.status ? res.status(200).send(getSum) : res.status(500).send(getSum);
    }
}