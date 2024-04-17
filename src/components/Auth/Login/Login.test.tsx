import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Login } from '@app/components/Auth';
import { render, screen } from '@app/tests';

describe('Renders the Register component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Login />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
