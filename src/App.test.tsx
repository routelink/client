import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@app/tests';
import App from './App';

describe('Renders the main page', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<App />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
