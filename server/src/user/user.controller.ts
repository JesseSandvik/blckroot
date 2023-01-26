import { Request, Response, NextFunction } from "express";
const users = require("../../data/users");

interface User {
  id: string;
  username: string;
  password: string;
}

function userExists(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  const matchingUser = users.find((user: User) => user.id = userId);

  if (matchingUser) {
    res.locals.user = matchingUser;
    next();
  }
  next({
    status: 404,
    message: `User with Id ${userId} does not exist.`,
  });
}

function readUser (req: Request, res: Response) {
  const { data } = res.locals.user;
  res.json({ data });
}

  module.exports = {
    read: [userExists, readUser],
  }
