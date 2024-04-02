import { Link as ILink } from '@app/models';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { Sidebar } from './Sidebar';
import { useState } from 'react';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import StarIcon from '@mui/icons-material/Star';
import NearMeIcon from '@mui/icons-material/NearMe';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BadgeIcon from '@mui/icons-material/Badge';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const drawerWidth = 260;
interface BoxProps extends MuiBoxProps {
  open?: boolean;
  mobile?: string;
}

const Box = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'open',
})<BoxProps>(({ theme, open, mobile }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !mobile && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const items: ILink[] = [
  {
    href: '/profile',
    text: 'Профиль',
    icon: <PersonIcon />,
  },
  {
    href: '/organization',
    text: 'Организация',
    icon: <CorporateFareIcon />,
  },
  {
    href: '/favorite',
    text: 'Избранное',
    icon: <StarIcon />,
  },
  {
    href: '/maps',
    text: 'Карта',
    icon: <NearMeIcon />,
  },
  {
    href: '/transport',
    text: 'Управление транспортом',
    icon: <DirectionsCarIcon />,
  },
  {
    href: '/employees',
    text: 'Управление сотрудниками',
    icon: <BadgeIcon />,
  },
  {
    href: '/analytics',
    text: 'Аналитика',
    icon: <InsertChartIcon />,
  },
];
export function Main() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(
    (localStorage.getItem('open') === 'true' ? true : false) && !isMobile,
  );

  const [openMobile, setOpenMobile] = useState(false);

  const handleSidebarMobileToggle = () => {
    setOpenMobile(!openMobile);
  };

  const handleSidebarToggle = () => {
    localStorage.setItem('open', String(!open));
    setOpen(!open);
  };
  return (
    <Observer>
      {() => {
        return (
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              {isMobile ? (
                <Sidebar
                  sidebarOpen={openMobile}
                  PaperProps={{
                    style: { width: drawerWidth },
                  }}
                  links={items}
                  handleSidebarToggle={handleSidebarMobileToggle}
                  variant="temporary"
                  open={openMobile}
                  onClose={handleSidebarMobileToggle}
                />
              ) : null}

              <Sidebar
                sidebarOpen={open}
                PaperProps={{
                  style: { width: drawerWidth },
                }}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none',
                  },
                }}
                links={items}
                handleSidebarToggle={handleSidebarToggle}
              />
              <Box
                open={open}
                mobile={isMobile ? 'true' : undefined}
                component="main"
                sx={{ flexGrow: 1 }}
              >
                <Header
                  sidebarOpen={isMobile ? openMobile : open}
                  handleSidebarToggle={
                    isMobile ? handleSidebarMobileToggle : handleSidebarToggle
                  }
                />
                <Box component="main" sx={{ flex: 1, py: 4, px: 4 }}>
                  <Outlet />
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        );
      }}
    </Observer>
  );
}
