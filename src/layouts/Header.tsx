import * as React from 'react';
import { useState } from 'react';

import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStore } from '@app/store';

interface HeaderProps {
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
}
export function Header(props: HeaderProps) {
  const { authStore } = useStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [all, setAll] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (all) authStore.logoutAll();
    else authStore.logout();
  };

  const { handleSidebarToggle, sidebarOpen } = props;
  return (
    <AppBar sx={{ zIndex: 1100 }} color="inherit" position="sticky">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'start',
            justifyItems: 'start',
            display: 'flex',
          }}>
          {!sidebarOpen ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
          ) : null}
        </Box>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={() => setOpenDialog(true)}>Выйти</MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle>Выйти из аккаунта</DialogTitle>
        <DialogContent>
          <Typography>Вы действительно хотите выйти из аккаунта?</Typography>
          <FormControlLabel
            value={all}
            onChange={() => setAll(!all)}
            control={<Checkbox />}
            label="Выйти из всех устройств"
          />
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={() => setOpenDialog(false)}>
            Отмена
          </Button>
          <Button onClick={handleLogout} autoFocus>
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
