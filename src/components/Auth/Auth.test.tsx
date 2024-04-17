import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Auth } from '@app/components/Auth/Auth';
import { render, screen } from '@app/tests';

describe('Renders the Auth component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Auth />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
