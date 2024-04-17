import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { render, screen } from '@app/tests';

import { Organizations } from './Organizations';

describe('Organizations', () => {
  beforeEach(() => {
    render(<Organizations />);
  });

  it('should be component initialize', () => {
    expect(screen).toBeTruthy();
  });
});
