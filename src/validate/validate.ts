import { SchedueInterface } from "../models/scheduleModel";

export const validate = (obj: SchedueInterface) => {
  let errors: SchedueInterface = {
    name: "",
    scheduler: "",
    schedule_date: "",
  };

  if (!obj.name) {
    errors.name = "Feild cannot be Empty";
  } else if (!obj.scheduler) {
    errors.scheduler = "Feild cannot be Empty";
  } else if (!obj.schedule_date) {
    errors.name = "Feild cannot be Empty";
  }

  return errors;
};
