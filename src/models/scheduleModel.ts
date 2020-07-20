import mongoose from "mongoose";

export interface SchedueInterface {
  _id: string;
  name: string;
  scheduler: string;
  schedule_date: string;
  performed_date?: string;
  perform_count?: string;
  file?: string;
  type: string;
  interval_range: string;
  interval_time: string;
  stop_date?: string;
}

const ScheduleSchema = new mongoose.Schema({
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

export default mongoose.model("report", ScheduleSchema);
