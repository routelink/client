import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { ProfileService } from '@app/services';

export class ProfileStore {
  _user: IUser | null = null;
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
  }): Promise<string | null> {
    return this.profileService.changePassword(options).then((response) => {
      //console.log(response.data);
      return response.data?.message
        ? response.data?.message
        : 'Password update successfuly';
    });
  }
}
