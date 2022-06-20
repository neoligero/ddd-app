import { UseCase } from '@shared/usecase';
import { CreateUserParams, User } from '../entities';

export type UserCreatorUseCase = UseCase<CreateUserParams, Promise<User>>;