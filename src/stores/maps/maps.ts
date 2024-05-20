import { makeAutoObservable } from 'mobx';

import { IMetrica, TMaps } from '@app/models';

export class MapsStore {
  _maps: TMaps = 'yandex';

  _points: Map<number, IMetrica> = new Map();

  _isMove = false;

  _coords: GeolocationPosition = {} as GeolocationPosition;
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

  get points(): IMetrica[] {
    return Array.from(this._points.values());
  }
  set points(points: Map<number, IMetrica>) {
    this._points = points;
  }

  addPoint(point: IMetrica): IMetrica[] {
    this._points.set(point.transportId, point);
    return Array.from(this._points.values());
  }

  get coords(): GeolocationPosition {
    return this._coords;
  }
  set coords(coords: GeolocationPosition) {
    this._coords = coords;
  }

  errorCoords(error: GeolocationPositionError) {
    console.error(error);
  }
  setCoords(coords: GeolocationPosition) {
    console.log(coords);

    this.coords = coords;
  }

  get isMove(): boolean {
    return this._isMove;
  }
  set isMove(status: boolean) {
    this._isMove = status;
  }
  switchMove(): boolean {
    this.isMove = !this.isMove;
    console.log(this.isMove);

    return this.isMove;
  }
}
