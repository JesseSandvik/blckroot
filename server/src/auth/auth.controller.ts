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
  const { userId } = req.params;
  const matchingUser = users.find((user: User) => user.id === parseInt(userId));

  if (matchingUser) {
    res.locals.user = matchingUser;
    next();
  }
  next({
    status: 401,
    message: `User not found.`,
  });
}

function handleLogin(req: Request, res: Response) {
  const { email, password } = res.locals.user.data;
  res.json({ data: { email, password } });
}

module.exports = {
  login: [hasValidProperties, validateEmailAddress, userExists, handleLogin],
};
