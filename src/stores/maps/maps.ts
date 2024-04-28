import { makeAutoObservable } from 'mobx';

import { TMaps } from '@app/models';

export class MapsStore {
  _maps: TMaps = 'yandex';

  constructor() {
    this._maps = (localStorage.getItem('maps') as TMaps) ?? `yandex`;
    makeAutoObservable(this);
  }

  get maps(): TMaps {
    return this._maps;
  }

  set maps(maps: TMaps) {
    this._maps = maps;
    localStorage.setItem('maps', maps);
  }
}
