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
const scheduleModel_1 = __importDefault(require("../models/scheduleModel"));
const reportController_1 = require("./reportController");
exports.sentReport = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield scheduleModel_1.default.find();
        let new_reports = reports.filter((report) => {
            return new Date(report.schedule_date) > new Date();
        });
        console.log(new_reports);
        uploadReport(new_reports);
        // upload report
    }
    catch (error) {
        console.log({ error });
    }
});
const uploadReport = (reports) => {
    reports.forEach((report) => {
        updateReport(report);
    });
};
const updateReport = (report) => __awaiter(void 0, void 0, void 0, function* () {
    if (report.type === "once" &&
        report.schedule_date < new Date().toISOString()) {
        yield scheduleModel_1.default.findByIdAndUpdate(report._id, {
            performed_date: new Date().toISOString(),
            schedule_date: new Date().toISOString(),
            perform_count: report.perform_count + 1,
        }, { new: true });
    }
    else {
        if (report.type === "reoccuring") {
            // recurring without stoppage time
            if (report.interval_time && report.interval_range && !report.stop_date) {
                yield scheduleModel_1.default.findByIdAndUpdate(report._id, {
                    schedule_date: newSchedule(report.interval_time, report.interval_range),
                    perform_count: report.perform_count + 1,
                }, { new: true });
            }
            // reoccuring with stoppage time
            if (report.interval_time && report.interval_range && report.stop_date) {
                if (report.stop_date < new Date().toISOString()) {
                    yield scheduleModel_1.default.findByIdAndUpdate(report._id, {
                        performed_date: new Date().toISOString(),
                        schedule_date: new Date().toISOString(),
                        perform_count: report.perform_count + 1,
                    }, { new: true });
                }
                else {
                    yield scheduleModel_1.default.findByIdAndUpdate(report._id, {
                        schedule_date: newSchedule(report.interval_time, report.interval_range),
                        perform_count: report.perform_count + 1,
                    }, { new: true });
                }
            }
        }
    }
});
const INTERVAL_RANGE_MAP = {
    minutes: 1000 * 60,
    hours: 60 * 60 * 1000,
    day: 1000 * 60 * 60 * 24,
    month: 1000 * 60 * 60 * 24 * 30,
};
const intervalCal = {
    minutes: 60,
    hours: 60 * 60,
    day: 60 * 60 * 24,
    month: 60 * 60 * 24 * 30,
};
const newSchedule = (time, interval) => {
    let min = Number(interval) * intervalCal[time];
    let date_str = new Date(Date.now() + INTERVAL_RANGE_MAP[time] * min);
    let date = new Date(reportController_1.addHours(date_str, 60));
    return new Date(Date.now() + INTERVAL_RANGE_MAP[time] * min).toISOString();
};
//# sourceMappingURL=task.js.map