import "reflect-metadata";
import { Response, Request, NextFunction } from "express";
import { injectable } from "inversify";

@injectable()
export class UserValidator {
  constructor() { }

  async validateCreateUser(req: Request, res: Response, next: NextFunction) {
    next();
  }

  async validateUserRetriever(req: Request, res: Response, next: NextFunction) {
    next();
  }

}