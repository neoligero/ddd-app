
import { Container } from 'inversify';
import { CustomLogger, WinstonLogger } from './logger';
import { EmailAdapter } from './mailer';

export const bindToContainer = (container: Container) => {
  // Adapters
  container.bind<CustomLogger>('CustomLogger').to(WinstonLogger);
  container.bind<EmailAdapter>('EmailAdapter').to(EmailAdapter);
};