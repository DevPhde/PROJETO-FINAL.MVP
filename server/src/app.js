import express  from "express";
import { syncTables } from "./helper/syncDatabase/syncTAbles.js";
import { router } from "./router/routes.js";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

syncTables();