"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express();
app.get('/', (req, res) => {
    res.send(`Express + TypeScript Server is running!`);
});
exports.default = app;
