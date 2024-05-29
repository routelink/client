import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { EmployeesService } from '@app/services';

export class EmployeesStore {
  private _employees: IUser[] = [];
  private _employee: IUser | null = null;

  private readonly employeesService = new EmployeesService();

  constructor() {
    makeAutoObservable(this);
  }
  async getCollection(): Promise<IUser[]> {
    return this.employeesService.getCollection().then((response) => {
      this.employees = response.data;
      return response.data;
    });
  }
  async getFreeCollection(): Promise<IUser[]> {
    return this.employeesService.getFreeCollection().then((response) => {
      return response.data;
    });
  }
  async getItem(id: number): Promise<IUser> {
    return this.employeesService.getItem(id).then((response) => {
      this.employee = response.data;

      return response.data;
    });
  }
  async create(options: { roleId: number; userId: number; transportId?: number }) {
    return this.employeesService.create(options).then((response) => {
      this.getCollection();
      return response.data;
    });
  }
  async delete(id: number) {
    return this.employeesService.delete(id).then((response) => {
      return response.data;
    });
  }
  get employees(): IUser[] {
    return this._employees;
  }

  set employees(value: IUser[]) {
    this._employees = value;
  }
  get employee(): IUser | null {
    return this._employee;
  }
  set employee(value: IUser | null) {
    this._employee = value;
  }
}
