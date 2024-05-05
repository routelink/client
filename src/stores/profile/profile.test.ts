import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { ProfileStore } from './profile';

describe('profile store', () => {
  let store: ProfileStore;
  beforeEach(() => {
    store = new ProfileStore();
  });

  it('create store', () => {
    expect(store).toBeInstanceOf(ProfileStore);
  });
});
