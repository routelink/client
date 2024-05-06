import { describe, expect, test } from 'vitest';

import api from './api';

describe('api service', () => {
  test('fetch base url', async () => {
    expect((await api.get('/')).status).toEqual(200);
  });
});
