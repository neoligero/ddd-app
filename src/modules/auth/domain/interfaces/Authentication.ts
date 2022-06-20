import { User } from "@modules/users";

export interface Authentication {
  validate: (barearToken?: string) => Promise<AuthenticationResponse>;
}

export interface AuthenticationResponse {
  status: string;
  user: User | {} | null; // {} is not valid here, It's just a mock
}