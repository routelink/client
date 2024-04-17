import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ForgotPassword } from '@app/components/Auth';
import { render, screen } from '@app/tests';

describe('Renders the Register component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<ForgotPassword />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
