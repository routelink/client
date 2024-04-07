import { useState } from 'react';

export function useModal() {
  const [open, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!open);
  };

  return {
    open,
    toggle,
  };
}
