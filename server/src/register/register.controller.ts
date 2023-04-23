import { Request, Response, NextFunction } from "express";
const users = require("../../data/users");
const validProperties = ["email", "password"];

function allPropertiesAreValid(arr: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => {
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

function validateEmailAddress(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body.data;
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

  if (EMAIL_REGEX.test(email)) {
    next();
  } else {
    next({
      status: 400,
      message: "A valid email is required.",
    });
  }
}

const hasValidProperties = allPropertiesAreValid(validProperties);

function createUser(req: Request, res: Response) {
  const { email, password } = req.body.data;
  const newUser = {
    email,
    password,
  };
  users.push(newUser);
  res.status(201).json({ data: newUser });
}

module.exports = {
  create: [hasValidProperties, validateEmailAddress, createUser],
};
