import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { ProfileService } from '@app/services';

//import { AppStore } from '../app';

export class ProfileStore {
  _user: IUser | null = null;
  _success: string | null = null;
  private readonly profileService = new ProfileService();

  constructor() {
    makeAutoObservable(this);
  }

  get user(): IUser | null {
    return this._user;
  }

  set user(value: IUser) {
    this._user = value;
  }
  get success(): string | null {
    return this._success;
  }
  set success(msg: string | null) {
    this._success = msg;
  }
  async getProfile(): Promise<IUser> {
    return this.profileService.getProfile().then((response) => {
      this.user = response.data;
      return response.data;
    });
  }
  async changeUsername(options: { username: string }): Promise<IUser> {
    return this.profileService.changeUsername(options).then((response) => {
      this.user = response.data;
      return response.data;
    });
  }
  async changePassword(options: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<IUser> {
    return this.profileService.changePassword(options).then((response) => {
      //console.log(response.data?.message);
      this.success = response.data?.message;
      return response.data;
    });
  }
}
