import { Observer } from 'mobx-react-lite';
import { createElement } from 'react';
import { NavLink } from 'react-router-dom';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import logo from '@app/assets/logo-white.png';
import { useStore } from '@app/store';

interface SidebarProps extends DrawerProps {
  handleSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export function Sidebar(props: SidebarProps) {
  const { handleSidebarToggle, sidebarOpen, ...other } = props;

  const { linksStore } = useStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Observer>
      {() => {
        return (
          <Drawer
            sx={{ zIndex: 1200 }}
            variant="persistent"
            open={sidebarOpen}
            anchor="left"
            {...other}>
            <List sx={{ bgcolor: theme.palette.common.black, flexGrow: 1, py: 0 }}>
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2.5,
                  ...theme.mixins.toolbar,
                }}>
                <Stack
                  className="Staaaaaaack"
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={1}
                  spacing={0}
                  sx={{ width: '100%' }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleSidebarToggle}
                    color="inherit">
                    <MenuOpenIcon
                      sx={{
                        color: theme.palette.common.white,
                        minWidth: 0,
                        justifyContent: 'center',
                      }}
                    />
                  </IconButton>
                  <Stack
                    component={NavLink}
                    to="/"
                    direction="row"
                    onClick={isMobile ? handleSidebarToggle : () => {}}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.common.black,
                      '&:hover': {
                        textDecoration: 'none',
                        color: theme.palette.common.black,
                      },
                    }}>
                    <img width={120} src={logo} className="logo" alt="RouteLink" />
                  </Stack>
                </Stack>
              </ListItem>
              <Divider sx={{ opacity: 1 }} />
              <Stack sx={{ flexGrow: 1, py: 0 }}>
                {linksStore.getLinks().map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      component={NavLink}
                      to={item.href}
                      onClick={isMobile ? handleSidebarToggle : () => {}}
                      selected={
                        item.exact && true === item.exact
                          ? location.pathname === item.href
                          : location.pathname.indexOf(item.href) === 0
                      }
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5,
                        ':hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: theme.palette.common.white,
                          mr: 2,
                          justifyContent: 'center',
                        }}>
                        {createElement(item.icon)}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          opacity: 1,
                          color: theme.palette.common.white,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Stack>
            </List>
          </Drawer>
        );
      }}
    </Observer>
  );
}
