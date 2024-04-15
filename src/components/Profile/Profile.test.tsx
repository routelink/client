import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@app/tests';
import { Profile } from './Profile';

describe('Renders the profile component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Profile />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
