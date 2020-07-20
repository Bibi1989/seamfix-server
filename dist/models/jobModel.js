"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    performed_at: Date,
    perform_at: Date,
    report_id: String,
});
exports.default = mongoose_1.default.model("job", JobSchema);
//# sourceMappingURL=jobModel.js.map