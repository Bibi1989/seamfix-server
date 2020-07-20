"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
dotenv_1.default.config();
const app = express_1.default();
const MONGO_URL = process.env.MONGODB_URL;
mongoose_1.default
    .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to db!!!"))
    .catch((err) => console.log(`Error from db, ${err}`));
// import routes from the route module
const schedule_1 = __importDefault(require("./routes/schedule"));
const task_1 = require("./controllers/task");
app.use(express_fileupload_1.default({ useTempFiles: true }));
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// endpoints for imported routes
app.use("/api", schedule_1.default);
app.all("*", (req, res, next) => {
    if (req.method === "OPTIONS") {
        res.status(200).end();
    }
    else {
        res.json({ error: "Wrong endpoint" });
    }
});
node_cron_1.default.schedule("* * * * *", () => {
    task_1.sentReport();
    console.log("running a task every minute");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: "Something went wrong" });
});
exports.default = app;
//# sourceMappingURL=app.js.map