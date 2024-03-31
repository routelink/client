import { describe, expect, test } from 'vitest';
import api from './api';

describe('api service', () => {
    test('get params', async () => {
        expect(api.defaults.baseURL).toEqual('http://localhost');
    });
});
