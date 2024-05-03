import { makeAutoObservable } from 'mobx';

export class AppStore {
  openSidebar;
  openMobile = false;

  _loading = false;
  _error: string | null = null;

  constructor() {
    this.openSidebar = localStorage.getItem('open') === `true`;
    makeAutoObservable(this);
  }

  toggleOpenSidebar(): void {
    this.openSidebar = !this.openSidebar;
    localStorage.setItem('open', String(this.openSidebar));
  }

  toggleOpenMobile(): void {
    this.openMobile = !this.openMobile;
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
}

export default new AppStore();
