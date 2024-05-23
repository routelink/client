import { AxiosResponse } from 'axios';
import { action, makeAutoObservable } from 'mobx';

import { IAuthResponse } from '@app/models';
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
export class AuthStore {
  loading: boolean = false;
  _token: string | null = null;
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
  }
  get token(): string | null {
    return this._token;
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

  isAuth(): boolean {
    return !!this.token;
  }
}

export default new AuthStore();
