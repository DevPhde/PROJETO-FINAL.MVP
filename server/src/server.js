import { app } from "./app.js";
import { Logger } from "./helper/logger/consoleLogger.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    Logger.console(`Server listenning into port => ${port}`);
})