import { Router } from "express";
import {
  uploadReports,
  getReports,
  deleteReport,
} from "../controllers/reportController";

const route = Router();

route.get("/upload", getReports);
route.post("/upload", uploadReports);
route.delete("/upload/:id", deleteReport);

export default route;
