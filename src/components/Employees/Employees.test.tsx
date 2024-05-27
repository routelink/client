import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@app/tests';

import { Employees } from './Employees';

describe('Renders the Employees Management page', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Employees />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
