import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { UserService } from '@app/services';

export class UsersStore {
  _users: IUser[] = [];
  _user: IUser = {} as IUser;

  private readonly usersService = new UserService();

  constructor() {
    makeAutoObservable(this);
  }

  async getCollection() {
    return await this.usersService
      .getCollection()
      .then((response: AxiosResponse<IUser[]>) => {
        this.users = response.data;
        return this.users;
      });
  }

  async getItem(id: number) {
    return await this.usersService.getItem(id).then((response: AxiosResponse<IUser>) => {
      this.user = response.data;
      return this.user;
    });
  }

  async create(data: any) {
    return await this.usersService
      .create(data)
      .then((response: AxiosResponse<IUser>) => {
        this.user = response.data;
        return this.user;
      })
      .then(() => this.getCollection());
  }

  async update(data: any) {
    return await this.usersService.update(data).then((response: AxiosResponse<IUser>) => {
      this.user = response.data;
      return this.user;
    });
  }

  async delete(id: number) {
    return await this.usersService
      .delete(id)
      .then((response: AxiosResponse<IUser>) => {
        this.user = response.data;
        return this.user;
      })
      .then(() => this.getCollection());
  }

  getUsers(filter?: string): IUser[] {
    if (!filter || filter.trim() === '') {
      return this._users;
    }
    filter = filter.trim().toLowerCase();

    return this._users.filter((user) => {
      if (
        user.username.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter) ||
        user.organization?.name.toLowerCase().includes(filter) ||
        user.role?.name.toLowerCase().includes(filter)
      ) {
        return true;
      }
      return false;
    });
  }

  get users() {
    return this._users;
  }
  set users(value: IUser[]) {
    this._users = value;
  }
  get user() {
    return this._user;
  }
  set user(value: IUser) {
    this._user = value;
  }
}
