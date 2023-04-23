"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = void 0;
const handleNotFound = (req, res, next) => {
    next({
        status: 404,
        message: `Path not found: ${req.originalUrl}`,
    });
};
exports.handleNotFound = handleNotFound;
