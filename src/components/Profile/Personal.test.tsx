import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@app/tests';

import { Personal } from './Personal';

describe('Renders the personal component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Personal />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
