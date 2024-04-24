import { action, makeObservable, observable } from 'mobx';

export class TitleStore {
  title: string = 'RouteLink';
  constructor() {
    makeObservable(this, {
      title: observable,
      getTitle: action,
      setTitle: action,
    });
  }

  getTitle(): string {
    return this.title;
  }
  setTitle(title: string): void {
    this.title = title;
  }
}
