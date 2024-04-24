import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { LinksStore } from './links';

describe('app store', () => {
  let store: LinksStore;
  beforeEach(() => {
    store = new LinksStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(LinksStore);
  });
});
