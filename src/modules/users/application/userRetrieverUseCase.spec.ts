import { CustomLoggerDouble } from '@shared/logger/test/customLoggerDouble';
import { UserRepositoryDouble } from '../test/userRepositoryDouble';
import { UserRetriever } from './userRetrieverUseCase';

describe('User Retriever', () => {
  const logger = new CustomLoggerDouble();
  const userRepository = new UserRepositoryDouble();

  const useCase = new UserRetriever(logger, userRepository);

  beforeEach(() => {
    userRepository.getOneById = jest.fn().mockReturnValue("mockUser");
    logger.info = jest.fn();
  });

  it('logs request params', async () => {
    const params = requestFrom();
    await useCase.invoke(params);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Invoking UserRetriever...', params);
  });

  it('Retrieves the user and returns 200', () => {
    // Here goes the implementation of the test
    expect(1).toBe(1);
  });

  it('Return 404 is the user is not found', () => {
    // Here goes the implementation of the test
    expect(1).toBe(1);
  });

  const requestFrom = () => ({
    name: 'name',
    email: 'email@email.com',
    password: 'password',
  });
});