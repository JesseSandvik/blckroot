import { hash } from "bcrypt";
import { Request, Response } from "express";
import {
  allPropertiesAreValid,
  emailFormatIsValid,
} from "../middleware/validation";
const { users, addUser } = require("../../data/users.js");

const validProperties = ["email", "password"];
const hasValidProperties = allPropertiesAreValid(validProperties);

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body.data;
  const hashedPassword = await hash(password, 10);
  const newUser = {
    id: `AF${Math.random()}`,
    email,
    password: hashedPassword,
  };
  addUser(newUser);
  console.log({ newUser });
  res.status(201).json({ data: newUser });
}

module.exports = {
  create: [hasValidProperties, emailFormatIsValid, createUser],
};
