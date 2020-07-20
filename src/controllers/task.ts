import Schedule, { SchedueInterface } from "../models/scheduleModel";
import { addHours } from "./reportController";
import { DateInterface } from "../interfaces/interface";

export const sentReport = async () => {
  try {
    const reports: any[] = await Schedule.find();
    let new_reports = reports.filter((report: any) => {
      return new Date(report.schedule_date) > new Date();
    });
    console.log(new_reports);
    uploadReport(new_reports);
    // upload report
  } catch (error) {
    console.log({ error });
  }
};

const uploadReport = (reports: any[]) => {
  reports.forEach((report) => {
    // upload to cloud
    updateReport(report);
  });
};

const updateReport = async (report: SchedueInterface) => {
  console.log(isReoccuring(report));
  if (isReoccuring(report)) {
    console.log("updateReport");
    await Schedule.findByIdAndUpdate(
      report._id,
      {
        schedule_date: newSchedule(report.interval_time, report.interval_range),
        perform_count: report.perform_count + 1,
      },
      { new: true }
    );
  } else {
    await Schedule.findByIdAndUpdate(report._id, {
      performed_date: Date.now(),
      perform_count: report.perform_count + 1,
    });
  }
};

const isReoccuring = (report: SchedueInterface) => {
  if (report.type !== "reoccuring") return false;

  // recurring without stoppage time
  if (
    report.interval_time &&
    Number(report.interval_range) > 0 &&
    !report.stop_date
  ) {
    return true;
  }

  // reoccuring with stoppage time
  if (
    report.interval_time &&
    report.interval_range &&
    report.stop_date &&
    report.stop_date < report.schedule_date
  ) {
    return true;
  } else {
    return false;
  }
};

const INTERVAL_RANGE_MAP: DateInterface = {
  minutes: 1000 * 60,
  hours: 60 * 60 * 1000,
  day: 1000 * 60 * 60 * 24,
  month: 1000 * 60 * 60 * 24 * 30,
};

const intervalCal: DateInterface = {
  minutes: 60,
  hours: 60 * 60,
  day: 60 * 60 * 24,
  month: 60 * 60 * 24 * 30,
};

const newSchedule = (time: string, interval: string) => {
  let min = Number(interval) * intervalCal[time];
  console.log(min);
  console.log(new Date(Date.now() + INTERVAL_RANGE_MAP[time] * min));
  let date_str: any = new Date(Date.now() + INTERVAL_RANGE_MAP[time] * min);
  console.log({ date_str });
  let date = new Date(addHours(date_str, 60));
  console.log({ date });
  return new Date(Date.now() + INTERVAL_RANGE_MAP[time] * min).toISOString();
};
