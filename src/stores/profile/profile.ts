import { action, makeObservable, observable } from 'mobx';

import avatar from '@app/assets/iivanov.jpg';
import { IUser } from '@app/models';
import { ProfileParam, ProfileService } from '@app/services';

export class ProfileStore {
  loading = true;
  data: IUser = {
    id: 1,
    username: '',
    email: '',
    avatar: '',
  };
  private readonly profileService = new ProfileService();

  constructor() {
    makeObservable(this, {
      loading: observable,
      data: observable,
      getProfile: action,
      changeName: action,
      changeAvatar: action,
    });
  }

  async getProfile(options?: ProfileParam): Promise<void> {
    this.loading = true;
    return this.profileService
      .getProfile(options)
      .then((response) => {
        response.data;
        this.data = {
          id: 1,
          username: 'Alexander M.Barmin',
          email: 'ambarmin@vniief.ru',
          avatar: avatar,
        };
      })
      .finally(() => this.setLoading(false));
  }

  setLoading(status: boolean) {
    this.loading = status;
  }

  async changeName(name: string, options?: ProfileParam): Promise<void> {
    this.loading = true;
    return this.profileService
      .getProfile(options)
      .then((response) => {
        response.data;
        this.data.username = name;
      })
      .finally(() => this.setLoading(false));
  }

  async changeAvatar(avatar: string, options?: ProfileParam): Promise<void> {
    this.loading = true;
    return this.profileService
      .getProfile(options)
      .then((response) => {
        response.data;
        this.data.avatar = avatar;
      })
      .finally(() => this.setLoading(false));
  }
}
