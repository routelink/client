import React, { ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { StoreProvider } from '@app/store';
import { MemoryRouter } from 'react-router-dom';

interface TestWrapperProps {
  children: ReactNode;
}

const TestWrapper = ({ children }: TestWrapperProps): JSX.Element => {
  return (
    <MemoryRouter>
      <StoreProvider>{children}</StoreProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
