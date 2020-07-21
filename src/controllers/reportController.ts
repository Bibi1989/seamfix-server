import { Response, Request } from "express";
import { v2 } from "cloudinary";

import Report, { SchedueInterface } from "../models/scheduleModel";
import { validate } from "../validate/validate";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadReports = async (req: any, res: Response) => {
  try {
    const errors = validate(req.body);
    if (errors.name || errors.scheduler || errors.schedule_date) {
      return res.status(404).json({ status: "error", error: errors });
    }
    console.log({ inp: req.body });
    let file = req.files.file;
    const reportFile = await v2.uploader.upload(
      file.tempFilePath,
      { folder: "report" },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        return result;
      }
    );
    let schedule;
    if (reportFile.secure_url) {
      schedule = new Report({ ...req.body, file: reportFile.secure_url });
      await schedule.save();
    }

    res.json({ status: "success", data: schedule });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    let new_reports = reports.filter((report: any) => {
      return new Date(report.schedule_date) > new Date();
    });
    res.json({ status: "success", data: new_reports });
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

export const addHours = function (report: string, h: number) {
  const date = new Date(report).setHours(new Date().getHours() + h / 60);
  return date;
};
