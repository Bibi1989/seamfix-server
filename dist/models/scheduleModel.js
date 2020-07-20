"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ScheduleSchema = new mongoose_1.default.Schema({
    name: String,
    scheduler: String,
    schedule_date: String,
    performed_date: Date,
    perform_count: {
        type: Number,
        default: 0,
    },
    file: String,
    type: String,
    interval_range: String,
    interval_time: String,
    stop_date: String,
});
exports.default = mongoose_1.default.model("report", ScheduleSchema);
//# sourceMappingURL=scheduleModel.js.map