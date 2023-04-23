import { Request, Response, NextFunction } from "express";
import {
  allPropertiesAreValid,
  validateEmailAddress,
} from "../middleware/validation";
const users = require("../../data/users");

interface User {
  id: number;
  email: string;
  password: string;
}

const validProperties = ["email", "password"];
const hasValidProperties = allPropertiesAreValid(validProperties);

function userExists(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body.data;
  const matchingUser = users.find((user: User) => user.email === email);

  if (matchingUser) {
    res.locals.user = matchingUser;
    next();
  } else {
    next({
      status: 401,
      message: `User not found.`,
    });
  }
}

function handleLogin(req: Request, res: Response) {
  const { email, password } = res.locals.user;
  res.json({ data: { email, password } });
}

module.exports = {
  login: [hasValidProperties, validateEmailAddress, userExists, handleLogin],
};
