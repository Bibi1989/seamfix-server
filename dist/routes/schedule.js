"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const route = express_1.Router();
route.get("/upload", reportController_1.getReports);
route.post("/upload", reportController_1.uploadReports);
route.delete("/upload", reportController_1.deleteReport);
exports.default = route;
//# sourceMappingURL=schedule.js.map