const mongoose = require("mongoose");
const Logger = require("./utils/Logger");

require("./models");
Logger.log("[Database] -> Models loaded.");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    Logger.log("[Database] -> Connection established.");
});

db.once("error", error => {
    Logger.error(`[Database] -> Error: ${error}`);
});

db.once("close", () => {
    Logger.warn("[Database] -> Database disconnected.");
});

module.exports = db;
