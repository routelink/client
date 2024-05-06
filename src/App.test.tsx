import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '@app/tests';

import App from './App';

describe('Renders the main page', () => {
  beforeEach(async () => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    await waitFor(() => {
      render(<App />);
    });
  });

  it('should be wrapper', async () => {
    expect(screen).toBeTruthy();
  });
});
