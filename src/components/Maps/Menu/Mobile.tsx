import { Observer } from 'mobx-react-lite';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { List, Search } from '@app/components/Maps/Menu';

export function MobileButton({ handleMenuToggle }: { handleMenuToggle: () => void }) {
  return (
    <>
      <Box className="mobile-button">
        <IconButton
          size="large"
          onClick={handleMenuToggle}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit">
          <MenuOpenIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center',
            }}
          />
        </IconButton>
      </Box>
    </>
  );
}

interface IMobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export function MobileMenu(props: IMobileMenuProps) {
  const { open, onClose, onOpen } = props;
  return (
    <Observer>
      {() => {
        return (
          <SwipeableDrawer
            className="drawwer-test"
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}>
            <Box
              className="wrapper"
              sx={{
                borderBottom: '1px solid gray',
              }}>
              <Search />
              <Box sx={{ maxHeight: '60vh', p: 2, overflow: 'auto' }}>
                <List />
              </Box>
            </Box>
          </SwipeableDrawer>
        );
      }}
    </Observer>
  );
}
