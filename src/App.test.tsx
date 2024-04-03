import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Renders the main page', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
