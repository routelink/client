import { action, makeObservable, observable } from 'mobx';

import { IUser } from '@app/models';
import { UsersFilter, UsersService } from '@app/services';

export class UsersStore {
  loading = true;
  users: IUser[] = [];
  private readonly userService = new UsersService();
  constructor() {
    makeObservable(this, {
      loading: observable,
      users: observable,
      getItems: action,
      setLoading: action,
    });
  }

  async getItems(options?: UsersFilter): Promise<void> {
    this.loading = true;
    return this.userService
      .getUsers(options)
      .then((response) => {
        this.users = response.data;
      })
      .finally(() => this.setLoading(false));
  }

  setLoading(status: boolean) {
    this.loading = status;
  }
}
