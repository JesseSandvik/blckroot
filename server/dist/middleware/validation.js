"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailAddress = exports.allPropertiesAreValid = void 0;
function allPropertiesAreValid(arr) {
    return (req, res, next) => {
        const { data } = req.body;
        arr.forEach((element) => {
            if (!data[element]) {
                next({
                    status: 400,
                    message: `${element} is required.`,
                });
            }
        });
        next();
    };
}
exports.allPropertiesAreValid = allPropertiesAreValid;
function validateEmailAddress(req, res, next) {
    const { email } = req.body.data;
    const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
    if (EMAIL_REGEX.test(email)) {
        next();
    }
    else {
        next({
            status: 400,
            message: "A valid email is required.",
        });
    }
}
exports.validateEmailAddress = validateEmailAddress;
