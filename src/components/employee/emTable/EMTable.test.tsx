import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EMTable } from './EMTable.tsx';

describe('Renders the Employee Management Table', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(
      <MemoryRouter>
        <EMTable />
      </MemoryRouter>,
    );
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});