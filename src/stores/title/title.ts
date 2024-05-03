import { makeAutoObservable } from 'mobx';

export class TitleStore {
  _title: string = 'RouteLink';
  constructor() {
    makeAutoObservable(this);
  }
  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }
}
