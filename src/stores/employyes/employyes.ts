import { AxiosResponse } from 'axios';
import { action, makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { EmployyesService } from '@app/services';

export class EmployeesStore {
  _employees: IUser[] = [];

  private readonly employeesService = new EmployyesService();

  constructor() {
    makeAutoObservable(this);
  }

  get employees(): IUser[] {
    return this._employees;
  }

  set employees(data: IUser[]) {
    this._employees = data;
  }
  async getCollection(params?: any): Promise<IUser[]> {
    return this.employeesService.getCollection(params).then(
      action((response: AxiosResponse<IUser[]>) => {
        this.employees = response.data;
        return response.data;
      }),
    );
  }

  async create(data: any): Promise<IUser> {
    return this.employeesService.create(data).then(
      action((response: AxiosResponse<IUser>) => {
        this.employees.push(response.data);
        return response.data;
      }),
    );
  }
}

export default new EmployyesService();
