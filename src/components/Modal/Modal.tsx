import { Observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { useStore } from '@app/store';

export interface IModal {
  children?: ReactNode;
  isOpen: boolean;
  toggle?: () => void;
}

export function Modal(props: IModal) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { appStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Drawer
            anchor={isMobile ? 'bottom' : 'left'}
            id="ddd"
            sx={{ zIndex: 1100, variant: 'persistent' }}
            PaperProps={{
              sx: {
                left: isMobile || !appStore.openSidebar ? 0 : 260,
                width: isMobile ? '100%' : 500,
              },
            }}
            open={props.isOpen}
            onClose={props.toggle}>
            {props.children}
          </Drawer>
        );
      }}
    </Observer>
  );
}
