import "reflect-metadata";
import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { UserCreatorUseCase, UserRetrieverUseCase } from "../../domain";

const { CREATED, OK, NOT_FOUND } = StatusCodes;

@injectable()
export class UserController {
  constructor(
    @inject('UserCreator') private userCreator: UserCreatorUseCase,
    @inject('UserRetriever') private userRetriever: UserRetrieverUseCase,
  ) { }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreated = await this.userCreator.invoke(req.body);
      return res.status(CREATED).json(userCreated);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userRetriever.invoke(req.params);
      if (!user) {
        return res.status(NOT_FOUND).json(user);
      }
      return res.status(OK).json(user);
    } catch (err) {
      next(err);
    }
  }

}