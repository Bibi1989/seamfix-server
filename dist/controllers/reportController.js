"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const scheduleModel_1 = __importDefault(require("../models/scheduleModel"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const schedule = new scheduleModel_1.default(Object.assign({}, req.body));
        yield schedule.save();
        res.json({ status: "success", data: "schedule" });
    }
    catch (error) {
        res.status(404).json({ status: "error", error: error.message });
    }
});
exports.getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield scheduleModel_1.default.find();
        res.json({ status: "success", data: reports });
    }
    catch (error) {
        res.status(404).json({ staus: "error", error: error.message });
    }
});
exports.deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield scheduleModel_1.default.findByIdAndDelete(req.params.id);
        res.json({ status: "success", data: "Schedule Deleted successfully!!!" });
    }
    catch (error) {
        res.status(404).json({ status: "error", error: error.message });
    }
});
function addHourDiff(report) {
    let newD;
    let a = "01";
    let b = report.schedule_date.slice(0, 11);
    let c = report.schedule_date.slice(13);
    if (a[0] == "0" && Number(a[1]) < 9) {
        a = `0${Number(a[1]) + 1}`;
    }
    else if (a[0] == "0" && Number(a[1]) == 9) {
        a = `${Number(a) + 1}`;
    }
    else if (Number(a) > 9 && Number(a) < 23) {
        a = `${Number(a) + 1}`;
    }
    else if (Number(a) >= 23) {
        a = `00`;
    }
    newD = b + a + c;
    console.log({ newD });
    return newD;
}
exports.addHours = function (report, h) {
    const date = new Date(report).setHours(new Date().getHours() + h / 60);
    return date;
};
//# sourceMappingURL=reportController.js.map