import { Request, Response, NextFunction } from "express";
const { users } = require("../../data/users");

interface User {
  id: number;
  email: string;
  password: string;
}

function userExists(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  const matchingUser = users.find((user: User) => user.id === parseInt(userId));

  if (matchingUser) {
    res.locals.user = matchingUser;
    next();
  }
  next({
    status: 404,
    message: `User with Id ${userId} does not exist.`,
  });
}

function readUser(req: Request, res: Response) {
  const data = res.locals.user;
  res.json({ data });
}

function listUsers(req: Request, res: Response) {
  const userList = [...users];
  res.json({ data: userList });
}

module.exports = {
  read: [userExists, readUser],
  list: [listUsers],
};
