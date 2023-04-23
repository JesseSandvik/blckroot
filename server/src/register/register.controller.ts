import { Request, Response } from "express";
import {
  allPropertiesAreValid,
  validateEmailAddress,
} from "../middleware/validation";
const users = require("../../data/users");

const validProperties = ["email", "password"];
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
