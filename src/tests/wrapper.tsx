import { RenderOptions, RenderResult, render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from '@app/store';

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
