import React, { ReactNode } from 'react';

import { IconButton } from '@mui/material';

export type RoundIconButtonProps = {
  background: string;
  color: string;
  width: string;
  height: string;
  fontSize: string;
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const RoundIconButton: React.FC<RoundIconButtonProps> = ({
  background = '#004d40',
  color = 'white',
  width = '48',
  fontSize = '24',
  children,
  onClick,
}) => {
  return (
    <IconButton
      style={{
        backgroundColor: background,
        color: color,
        width: `${width}px`,
        height: `${width}px`,
        fontSize: `${fontSize}px`,
      }}
      onClick={onClick}>
      {children}
    </IconButton>
  );
};
export default RoundIconButton;
