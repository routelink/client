import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconButton } from '@mui/material';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

import { List, Search } from '@app/components/Maps/Menu';
import { MobileMenu } from '@app/components/Maps/Menu';

const listWidth = 380;
interface BoxProps extends MuiBoxProps {
  open?: boolean;
  mobile?: string;
}

const BoxWrapper = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'open',
})<BoxProps>(({ theme, open, mobile }) => ({
  width: listWidth,
  background: '#ffff',
  border: '1px solid #E4E5E6',
  borderRadius: '5px',
  padding: '10px',

  zIndex: 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...((open || mobile) && {
    marginLeft: `calc(${listWidth}px * -1.5)`,
    overflow: 'hidden',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
interface MenuProps {
  maps: string;

  handleChangeMaps: (value: SelectChangeEvent) => void;
}
export function Menu(props: MenuProps) {
  const { handleChangeMaps, maps } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [view, setView] = useState(false);

  const [viewMobile, setViewMobile] = useState(false);

  const [showHeader, setShowHeader] = useState(isMobile ? false : true);
  const [viewTransport, setViewTransport] = useState(false);

  const handleMenuToggle = () => {
    setView(!view);
    setShowHeader(!showHeader);
    setViewTransport(!viewTransport);
  };
  const handleMenuToggleMobile = () => {
    setViewMobile(!viewMobile);
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          width: listWidth,
          height: '100%',

          zIndex: 1,
        }}>
        <Box
          className="wrapper-test"
          sx={{
            display: 'flex',
            flexDirection: 'column',

            p: 2,
            gap: '15px',
            height: '100%',
          }}>
          <Box>
            <OpenMenuButton
              isMobile={isMobile}
              handleMenuToggle={handleMenuToggle}
              handleMenuToggleMobile={handleMenuToggleMobile}
            />
          </Box>
          {isMobile ? (
            <>
              {viewMobile ? (
                <MobileMenu
                  open={viewMobile}
                  onClose={handleMenuToggleMobile}
                  onOpen={handleMenuToggleMobile}
                />
              ) : null}
            </>
          ) : null}
          <BoxWrapper open={view} mobile={isMobile ? 'true' : undefined}>
            <FormControl fullWidth>
              <InputLabel>Источник карт</InputLabel>
              <Select value={maps} label="Источник карт" onChange={handleChangeMaps}>
                <MenuItem value={'yandex'}>Яндекс</MenuItem>
                <MenuItem value={'cesium'}>Cesium</MenuItem>
              </Select>
            </FormControl>
          </BoxWrapper>
          <BoxWrapper
            open={view}
            mobile={isMobile ? 'true' : undefined}
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              height: '100%',
            }}>
            <Typography variant="h6" noWrap component="div">
              Транспортное средство
            </Typography>

            <Search />
            <List />
          </BoxWrapper>
        </Box>
      </Box>
    </>
  );
}
function OpenMenuButton({
  isMobile,
  handleMenuToggle,
  handleMenuToggleMobile,
}: {
  isMobile: boolean;
  handleMenuToggle: () => void;
  handleMenuToggleMobile: () => void;
}) {
  return (
    <Box>
      <IconButton
        sx={{
          color: 'black',
          background: 'white',
          border: '1px solid gray',
          ':hover': { background: '#F1F3F4', border: '1px solid black' },
        }}
        size="large"
        onClick={isMobile ? handleMenuToggleMobile : handleMenuToggle}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit">
        <MenuIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
          }}
        />
      </IconButton>
    </Box>
  );
}
