import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Employee} from './Employee.tsx';

describe('Renders the Employee Management page', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(
      <MemoryRouter>
        <Employee />
      </MemoryRouter>,
    );
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});