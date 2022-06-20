

import { Container } from 'inversify';
import { UserCreator } from './application';
import { UserCreatorUseCase } from './domain';
import { UserRepository } from './domain';
import { UserValidator } from './infrastruture';
import { UserMongooseRepository } from './infrastruture/persistence/userMongooseRepository';
import { UserController } from './infrastruture/rest/userController';

export const bindToContainer = (container: Container) => {
  // Repository
  container.bind<UserRepository>('UserRepository').to(UserMongooseRepository);

  // UseCase
  container.bind<UserCreatorUseCase>('UserCreator').to(UserCreator);

  // Rest
  container.bind<UserController>('UserController').to(UserController);
  container.bind<UserValidator>('UserValidator').to(UserValidator);
};