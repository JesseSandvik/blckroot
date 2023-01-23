import { Request, Response, NextFunction } from "express";
const path = require("path");
const users = require("../../data/users");

const validProperties = ["username", "password"];

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
  }
}

const hasValidProperties = allPropertiesAreValid(validProperties);

function createUser (req: Request, res: Response) {
    const { username, password } = req.body.data;
    const newUser = {
      username,
      password,
    };
    users.push(newUser);
    res.status(201).json({ data: newUser });
  }

  module.exports = {
    create: [hasValidProperties, createUser],
  }
