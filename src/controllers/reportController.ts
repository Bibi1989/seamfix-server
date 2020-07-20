import { Response, Request } from "express";
import { v2 } from "cloudinary";

import Report, { SchedueInterface } from "../models/scheduleModel";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadReports = async (req: any, res: Response) => {
  console.log(req.body);
  try {
    const schedule = new Report({ ...req.body });
    await schedule.save();

    res.json({ status: "success", data: "schedule" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.json({ status: "success", data: reports });
  } catch (error) {
    res.status(404).json({ staus: "error", error: error.message });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ status: "success", data: "Schedule Deleted successfully!!!" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

function addHourDiff(report: SchedueInterface) {
  let newD;
  let a = "01";
  let b = report.schedule_date.slice(0, 11);
  let c = report.schedule_date.slice(13);
  if (a[0] == "0" && Number(a[1]) < 9) {
    a = `0${Number(a[1]) + 1}`;
  } else if (a[0] == "0" && Number(a[1]) == 9) {
    a = `${Number(a) + 1}`;
  } else if (Number(a) > 9 && Number(a) < 23) {
    a = `${Number(a) + 1}`;
  } else if (Number(a) >= 23) {
    a = `00`;
  }
  newD = b + a + c;
  console.log({ newD });
  return newD;
}

export const addHours = function (report: string, h: number) {
  const date = new Date(report).setHours(new Date().getHours() + h / 60);
  return date;
};
