import { getRandomString } from "@shared/functions";
import { IdGenerator } from "@test/idGenerator";
import { User } from "../domain";

export class UserFactory {
  static create(params?: Partial<User>): User {
    return {
      _id: IdGenerator.generate(),
      name: 'username',
      email: `${ getRandomString(10) }@email.com`,
      password: 'password',
      ...params,
    }
  }
}