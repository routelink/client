import { Observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import BadgeIcon from '@mui/icons-material/Badge';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Link as ILink } from '@app/models';
import { useStore } from '@app/store';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

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
  {
    href: '/users',
    text: 'Пользователи',
    icon: <PeopleAltIcon />,
  },
  {
    href: '/organizations',
    text: 'Организации',
    icon: <CorporateFareIcon />,
  },
];

const style = {
  main: {
    padding: '22px',
    background: '#F1F3F4',
    '--header-height': '64px',
    '--header-height-mobile': '56px',
    height: `calc(100vh - var(--header-height))`,
    '@media (maxWidth: 768px)': {
      height: `calc(100vh - var(--header-height-mobile))`,
    },
  },
};
export function Main() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { appStore } = useStore();

  const handleMobile = () => appStore.toggleOpenMobile();
  const handleSidebar = () => appStore.toggleOpenSidebar();

  return (
    <Observer>
      {() => {
        return (
          <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F1F3F4' }}>
            {isMobile ? (
              <Sidebar
                sidebarOpen={appStore.openMobile}
                PaperProps={{
                  style: { width: drawerWidth },
                }}
                links={items}
                handleSidebarToggle={handleMobile}
                variant="temporary"
                open={appStore.openMobile}
                onClose={handleMobile}
              />
            ) : null}

            <Sidebar
              sidebarOpen={appStore.openSidebar}
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
              handleSidebarToggle={handleSidebar}
            />
            <Box
              open={appStore.openSidebar}
              mobile={isMobile ? 'true' : undefined}
              component="main"
              sx={{ flexGrow: 1 }}>
              <Header
                sidebarOpen={isMobile ? appStore.openMobile : appStore.openSidebar}
                handleSidebarToggle={isMobile ? handleMobile : handleSidebar}
              />
              <Box style={{ ...style.main }} sx={{ flex: 1 }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        );
      }}
    </Observer>
  );
}
