import { makeAutoObservable } from 'mobx';

import { TransportService } from '@app/services';

type TransportType = Record<number | string, string>;

export class AppStore {
  openSidebar;
  openMobile = false;
  _transportTypes: TransportType = {};

  _loading = false;
  _error: string | null = null;
  _success: string | null = null;

  private readonly transportService = new TransportService();

  constructor() {
    this.openSidebar = localStorage.getItem('open')
      ? localStorage.getItem('open') === `true`
      : true;
    makeAutoObservable(this);
  }

  toggleOpenSidebar(): void {
    this.openSidebar = !this.openSidebar;
    localStorage.setItem('open', String(this.openSidebar));
  }

  async getTransportTypes() {
    const res = await this.transportService.getTransportTypes();
    if (res) {
      this._transportTypes = res.reduce((acc: TransportType, cur) => {
        acc[cur.id] = cur.name;
        return acc;
      }, {});
    }
    console.log(this._transportTypes);
  }

  toggleOpenMobile(): void {
    this.openMobile = !this.openMobile;
  }

  get transportTypes() {
    return this._transportTypes;
  }

  get loading() {
    return this._loading;
  }
  set loading(loading: boolean) {
    this._loading = loading;
  }
  get error(): string | null {
    return this._error;
  }
  set error(error: string | null) {
    this._error = error;
  }
  get success(): string | null {
    return this._success;
  }
  set success(msg: string | null) {
    this._success = msg;
  }
}

export default new AppStore();
