// Please don't change the pre-written code
// Import the necessary modules here

import { logger } from "./logger.middleware.js";

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
    this.errMessage = errMessage;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  let message = "";
  if (err instanceof customErrorHandler) {
    message = err?.errMessage;
    res.status(err?.statusCode).send(err?.errMessage);
  } else {
    message = "Sorry! Something went wrong... Please try again later!";
    res
      .status(500)
      .send("Sorry! Something went wrong... Please try again later!");
  }
  logger.log({
    level: "error",
    "request URL": req.originalUrl,
    "error message": message,
  });

  // const errorLog = {
  //   level: "error",
  //   timestamp: new Date().toISOString(),
  //   "request URL": req.originalUrl,
  //   "error message": message,
  // };

  // // Log the error using Winston
  // logger.log(errorLog);
};
