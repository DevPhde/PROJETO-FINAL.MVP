import { TypeExpensesUseCases } from "../useCases/typeExpensesUseCases.js";

export class TypeExpensesController extends TypeExpensesUseCases {

   static listTypeExpenses = async (req, res) => {
    const data = await this.listTypes();
     data.status ? res.status(200).send(data) : res.status(500).send(data);
   }

    static createNewTypeExpense = async (req, res) => {
        const requisition = req.body;
        const created = await this.createNewType(requisition)
        created.status ? res.status(200).send(created) : created.message == "Tipo de despesa já existente." ? res.status(409).send(created) : res.status(500).send(created)
    }

    static deleteTypeExpense = async (req, res) => {
        const requisition = req.body;
        const deleted = await this.deleteType(requisition);
        deleted.status ? res.status(200).send(deleted) : res.status(500).send(deleted)
    }

}