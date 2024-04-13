import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppStore } from './app';

describe('app store', () => {
  let store: AppStore;
  beforeEach(() => {
    store = new AppStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(AppStore);
  });
  it('set open/hide sidebar', () => {
    expect(store.openSidebar).toBeFalsy();
    store.toggleOpenSidebar();
    expect(store.openSidebar).toBeTruthy();
    store.toggleOpenSidebar();
    expect(store.openSidebar).toBeFalsy();
  });
  it('set open/hide mobile', () => {
    expect(store.openMobile).toBeFalsy();
    store.toggleOpenMobile();
    expect(store.openMobile).toBeTruthy();
    store.toggleOpenMobile();
    expect(store.openMobile).toBeFalsy();
  });
});
