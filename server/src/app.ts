import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});

app.use("/register", require("./user/user.router"));

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 404,
    message: `Path not found: ${req.originalUrl}`,
  });
});

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
};

app.use(handleError);

module.exports = app;
