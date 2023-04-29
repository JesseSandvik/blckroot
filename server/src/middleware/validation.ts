import { Request, Response, NextFunction } from "express";

export function allPropertiesAreValid(arr: Array<string>) {
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
  };
}

export function emailFormatIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body.data;
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

  if (EMAIL_REGEX.test(email)) {
    next();
  } else {
    next({
      status: 400,
      message: "A valid email is required.",
    });
  }
}
