import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ChangePassword } from '@app/components/Auth';
import { render, screen } from '@app/tests';

describe('Renders the Register component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<ChangePassword />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
