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
const validate_1 = require("../validate/validate");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validate_1.validate(req.body);
        if (errors.name || errors.scheduler || errors.schedule_date) {
            return res.status(404).json({ status: "error", error: errors });
        }
        console.log({ inp: req.body });
        let file = req.files.file;
        const reportFile = yield cloudinary_1.v2.uploader.upload(file.tempFilePath, { folder: "report" }, (err, result) => {
            if (err) {
                console.log(err);
            }
            return result;
        });
        let schedule;
        if (reportFile.secure_url) {
            schedule = new scheduleModel_1.default(Object.assign(Object.assign({}, req.body), { file: reportFile.secure_url }));
            yield schedule.save();
        }
        res.json({ status: "success", data: schedule });
    }
    catch (error) {
        res.status(404).json({ status: "error", error: error.message });
    }
});
exports.getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield scheduleModel_1.default.find();
        let new_reports = reports.filter((report) => {
            return new Date(report.schedule_date) > new Date();
        });
        res.json({ status: "success", data: new_reports });
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
exports.addHours = function (report, h) {
    const date = new Date(report).setHours(new Date().getHours() + h / 60);
    return date;
};
//# sourceMappingURL=reportController.js.map