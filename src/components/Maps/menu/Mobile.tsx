import { Box, IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { List, Search } from '@app/components/Maps/menu';
import { ITransport } from '@app/models';

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
  items: ITransport[];
}
export function MobileMenu(props: IMobileMenuProps) {
  const { open, onClose, onOpen, items } = props;
  return (
    <>
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
            // p: 2,
            borderBottom: '1px solid gray',
          }}>
          <Search />
          <Box sx={{ maxHeight: '60vh', p: 2, overflow: 'auto' }}>
            <List items={items} />
            <List items={items} />
            <List items={items} />
            <List items={items} />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
