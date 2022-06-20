import { UseCase } from '@shared/usecase';
import { User } from '../entities';

export type UserRetrieverUseCase = UseCase<Record<string, any>, Promise<User | null>>;