"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = (obj) => {
    let errors = {
        name: "",
        scheduler: "",
        schedule_date: "",
    };
    if (!obj.name) {
        errors.name = "Feild cannot be Empty";
    }
    else if (!obj.scheduler) {
        errors.scheduler = "Feild cannot be Empty";
    }
    else if (!obj.schedule_date) {
        errors.name = "Feild cannot be Empty";
    }
    return errors;
};
//# sourceMappingURL=validate.js.map