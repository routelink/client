import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { action, makeAutoObservable } from 'mobx';

import { IAuthResponse, IPlayload, TRole } from '@app/models';
import { AuthService } from '@app/services';

export enum AUTH {
  REQUIRED = 0,
  INVALID_ACCESS_TOKEN = 1,
  EXPIRED_ACCESS_TOKEN = 2,
  INVALID_REFRESH_TOKEN = 3,
  NOT_FOUND_REFRESH_TOKEN = 4,
  EXPIRED_REFRESH_TOKEN = 5,
  REFRESH_ERROR = 6,
}
export interface IRegistrationData {
  username: string;
  email: string;
  password: string;
  password2: string;
}
export class AuthStore {
  loading: boolean = false;
  _token: string | null = null;
  _role: TRole | null = null;

  isAuthProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  set token(data: IAuthResponse | null) {
    if (data === null) {
      this._token = null;
      return;
    }

    this._token = data.token;
    this.setRole(data.token);
  }

  get token(): string | null {
    return this._token;
  }

  get role(): TRole | null {
    return this._role;
  }
  set role(data: TRole | null) {
    this._role = data;
  }

  async login(login: string, password: string): Promise<IAuthResponse> {
    this.isAuthProgress = true;
    return AuthService.login<AxiosResponse<IAuthResponse>>(login, password)
      .then(
        action((response: AxiosResponse<IAuthResponse>) => (this.token = response.data)),
      )
      .finally(action(() => (this.isAuthProgress = false)));
  }

  async refresh(): Promise<IAuthResponse> {
    this.loading = true;
    return AuthService.refresh<AxiosResponse<IAuthResponse>>()
      .then(
        action((response: AxiosResponse<IAuthResponse>) => {
          this.token = response.data;
          return response.data;
        }),
      )
      .catch((error) => error)
      .finally(action(() => (this.loading = false)));
  }
  async logout(): Promise<any> {
    return AuthService.logout().then(() => (this.token = null));
  }
  async logoutAll(): Promise<any> {
    return AuthService.logoutAll().then(() => (this.token = null));
  }

  async registration(option: IRegistrationData) {
    return AuthService.registration(option);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  setRole(token: string) {
    this.role = (jwtDecode(token) as IPlayload).role;
  }
}

export default new AuthStore();
