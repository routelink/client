// Replace these with your own component types
import { Components } from '@app/ui';
import React, { createContext, ReactNode, useContext } from 'react';

const ComponentContext = createContext<Components | undefined>(undefined);

interface ComponentProviderProps {
    children: ReactNode;
    components: Components;
}

export const ComponentProvider: React.FC<ComponentProviderProps> = ({ children, components }) => (
  <ComponentContext.Provider value={components}>
      {children}
  </ComponentContext.Provider>
);

export const useComponents = () => {
    const context = useContext(ComponentContext);
    if (context === undefined) {
        throw new Error('useComponents must be used within a ComponentProvider');
    }
    return context;
};