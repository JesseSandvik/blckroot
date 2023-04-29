import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { handleNotFound } from "./middleware/notFoundHandler";
import { handleError } from "./middleware/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/register", require("./register/register.router"));
app.use("/auth", require("./auth/auth.router"));
app.use("/users", require("./user/user.router"));

app.all("*", handleNotFound);
app.use(handleError);

module.exports = app;
