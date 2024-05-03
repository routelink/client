import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { MapsStore } from '@app/stores/maps';

describe('maps store', () => {
  let store: MapsStore;
  beforeEach(() => {
    store = new MapsStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(MapsStore);
  });
  it('set maps', () => {
    store.maps = 'cesium';
    expect(store.maps).toEqual('cesium');
    store.maps = 'yandex';
    expect(store.maps).toEqual('yandex');
  });
});
