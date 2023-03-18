import express  from "express";
import { syncTables } from "./helper/syncDatabase/syncTables.js";
import { router } from "./router/routes.js";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

syncTables();



// teste


import { TypeExpenseDatabaseRepositories } from "./repositories/databaseRepositories.js";
import { TypeExpense } from "./models/TypeExpense.js";



class Testes {
    static tipoDespesa = new TypeExpenseDatabaseRepositories()
    static async testeTypeExpense() {
        const tipo = tipoDespesa.describe()
        console.log(tipo)
    }
}

console.log(await TypeExpense.describe())
// Testes.testeTypeExpense

