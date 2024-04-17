import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { UsersStore } from './users';

describe('app store', () => {
  let store: UsersStore;
  beforeEach(() => {
    store = new UsersStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(UsersStore);
  });
});
