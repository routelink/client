import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { TitleStore } from '@app/stores/title';

describe('app store', () => {
  let store: TitleStore;
  beforeEach(() => {
    store = new TitleStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(TitleStore);
  });
  it('set title', () => {
    expect(store.title).toBe('RouteLink');
    store.title = 'test';
    expect(store.title).toBe('test');
  });
});
