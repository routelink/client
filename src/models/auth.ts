import { TRole } from '@app/models';

export interface IAuthResponse {
  token: string;
}

export interface IPlayload {
  email: string;
  role: TRole;
}
