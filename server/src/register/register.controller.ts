import { hash } from "bcrypt";
import { Request, Response } from "express";
import {
  allPropertiesAreValid,
  validateEmailAddress,
} from "../middleware/validation";
const { users, setUser } = require("../../data/users.js");

const validProperties = ["email", "password"];
const hasValidProperties = allPropertiesAreValid(validProperties);

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body.data;
  const hashedPassword = await hash(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
  };
  setUser(newUser);
  console.log({ newUser });
  res.status(201).json({ data: newUser });
}

module.exports = {
  create: [hasValidProperties, validateEmailAddress, createUser],
};
