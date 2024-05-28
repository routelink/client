import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { EmployeeService } from '@app/services';

export class EmployeesStore {
  _users: IUser[] = [];
  _user: IUser = {} as IUser;

  private readonly employeesService = new EmployeeService();

  constructor() {
    makeAutoObservable(this);
  }

  async getCollection() {
    return await this.employeesService
      .getCollection()
      .then((response: AxiosResponse<IUser[]>) => {
        this.employees = response.data;
        return this.employees;
      });
  }

  async getItem(id: number) {
    return await this.employeesService
      .getItem(id)
      .then((response: AxiosResponse<IUser>) => {
        this._user = response.data;
        return this.employee;
      });
  }

  async create(data: any) {
    return await this.employeesService
      .create(data)
      .then((response: AxiosResponse<IUser>) => {
        this._user = response.data;
        return this.employee;
      })
      .then(() => this.getCollection());
  }

  async update(data: any) {
    return await this.employeesService
      .update(data)
      .then((response: AxiosResponse<IUser>) => {
        this._user = response.data;
        return this.employee;
      });
  }

  async delete(id: number) {
    return await this.employeesService
      .delete(id)
      .then((response: AxiosResponse<IUser>) => {
        this._user = response.data;
        return this.employee;
      })
      .then(() => this.getCollection());
  }

  get employees() {
    return this._users;
  }
  set employees(value: IUser[]) {
    this._users = value;
  }
  get employee() {
    return this._user;
  }
  set employee(value: IUser) {
    this._user = value;
  }
}
