import { makeAutoObservable } from 'mobx';

import { TransportTypes } from '@app/models';
import { TransportService } from '@app/services';

export class AppStore {
  openSidebar;
  openMobile = false;
  _transportTypes: TransportTypes = {
    ru: {},
    en: {},
  };

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
    this._transportTypes =
      (await this.transportService.getTransportTypes()) as TransportTypes;
  }

  toggleOpenMobile(): void {
    this.openMobile = !this.openMobile;
  }

  get transportTypes() {
    return this._transportTypes['ru'];
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
