import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
// TODO: implement json web token
import { sign } from "jsonwebtoken";
import {
  allPropertiesAreValid,
  emailFormatIsValid,
} from "../middleware/validation";
const { users } = require("../../data/users.js");

interface User {
  id: number;
  email: string;
  password: string;
}

const validProperties = ["email", "password"];
const hasValidProperties = allPropertiesAreValid(validProperties);

function userExists(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body.data;
  const foundUser = users.find((user: User) => user.email === email);

  if (foundUser) {
    res.locals.user = foundUser;
    next();
  } else {
    next({
      status: 401,
      message: `User not found.`,
    });
  }
}

async function passwordIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = res.locals.user;

  const passwordMatches = await compare(password, req.body.data.password);

  if (passwordMatches) {
    next();
  } else {
    next({
      status: 401,
      message: "Email and password provided do not match our records.",
    });
  }
}

function handleLogin(req: Request, res: Response) {
  const { email, id, password } = res.locals.user;
  res.json({ data: { email, id, password } });
}

module.exports = {
  login: [
    hasValidProperties,
    emailFormatIsValid,
    userExists,
    passwordIsValid,
    handleLogin,
  ],
};
