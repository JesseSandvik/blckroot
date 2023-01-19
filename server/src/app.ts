import { Express, Request, Response } from "express";
const express = require("express");
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server is running!`);
});

export default app;