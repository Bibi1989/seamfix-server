import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import mongoose from "mongoose";
import cron from "node-cron";

dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db!!!"))
  .catch((err) => console.log(`Error from db, ${err}`));

// import routes from the route module
import uploadRoute from "./routes/schedule";
import { sentReport } from "./controllers/task";

app.use(fileupload({ useTempFiles: true }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// endpoints for imported routes
app.use("/api", uploadRoute);

app.all("*", (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    res.json({ error: "Wrong endpoint" });
  }
});

cron.schedule("* * * * *", () => {
  sentReport();
  console.log("running a task every minute");
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Something went wrong" });
});

export default app;
