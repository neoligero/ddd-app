import { CustomLogger } from '@shared/logger';
import { inject, injectable, unmanaged } from 'inversify';
import { Authentication, AuthenticationResponse } from '../interfaces';

@injectable()
export class AuthenticationService implements Authentication {
  // TODO: Improve this approach
  logger: CustomLogger;

  constructor(
    @unmanaged() logger: CustomLogger
  ) {
    this.logger = logger;
  }

  async validate(barearToken?: string): Promise<AuthenticationResponse> {
    this.logInvoke({ barearToken });

    if (!this.decodeToken(barearToken)) {
      return {
        status: 'unauthorized',
        user: null
      };
    }

    // Implement the logic to validate the token

    return {
      status: 'success',
      user: {}
    };
  }

  private decodeToken(barearToken?: string) {
    if (!barearToken) return null;

    // Implement the logic to decode the token

    return {};
  }

  private logInvoke(params: Record<string, any>) {
    this.logger.info(`${ this.constructor.name } was invoked.`, { params });
  }
}
