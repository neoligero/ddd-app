import { CustomLogger } from '@shared/logger';
import { inject, injectable } from 'inversify';
import { User, UserRepository, UserRetrieverUseCase } from '../domain';

@injectable()
export class UserRetriever implements UserRetrieverUseCase {
  constructor(
    @inject('CustomLogger') private logger: CustomLogger,
    @inject('UserRepository') private userRepository: UserRepository,
  ) { }

  async invoke(params: Record<string, any>): Promise<User | null> {
    this.logInvoke(params);

    return await this.userRepository.getOneById(params.userId);
  }

  private logInvoke(params: Record<string, any>) {
    this.logger.info(`${ this.constructor.name } was invoked.`, { params });
  }

}
