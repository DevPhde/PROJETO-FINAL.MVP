import sequelize from "../../db/dbConfig.js";
import { Logger } from "../logger/consoleLogger.js";


export async function syncTables() {
    sequelize.sync()
    .then(() => Logger.console('Tables synced successfully'))
    .catch((err) => Logger.console('Error synchronizing tables: ', err));
}