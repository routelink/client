import { makeAutoObservable } from 'mobx';

export class AppStore {
  openSidebar;
  openMobile = false;

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
}

export default new AppStore();
