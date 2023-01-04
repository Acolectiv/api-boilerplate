require("dotenv").config();
require("./db");

const express = require("express");
const apiRoutes = require("./routes");
const svConfig = require("./config/server");
const Logger = require("./utils/logger");
const bodyParser = require("body-parser");
const cors = require("cors");
const store = require("./managers/MemoryStore");
const rateLimit = require("express-rate-limit");

let limiter = new rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10
});

const app = express();

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', apiRoutes);

app.listen(svConfig.port, () => Logger.log(`[Express] -> Web Server listening to port ${svConfig.port}`));
