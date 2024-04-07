import { ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
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
    <div>
      <Drawer
        anchor={isMobile ? 'bottom' : 'left'}
        id="ddd"
        sx={{ zIndex: 10, variant: 'persistent' }}
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
    </div>
  );
}
