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
import { styled, useTheme } from '@mui/material/styles';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { useState } from 'react';
import { List, Search } from '@app/components/Maps/Menu';
import { MobileMenu } from '@app/components/Maps/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { ITransport } from '@app/models';

const listWidth = 380;
interface BoxProps extends MuiBoxProps {
  open?: boolean;
  mobile?: string;
}

const BoxWrapper = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'open',
})<BoxProps>(({ theme, open, mobile }) => ({
  width: listWidth,
  top: '5rem',
  left: '10px',
  maxHeight: '600px',
  position: 'absolute',
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
  items: ITransport[];
  maps: string;

  handleChangeMaps: (value: SelectChangeEvent) => void;
}
export function Menu(props: MenuProps) {
  const { handleChangeMaps, items, maps } = props;

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
      <OpenMenuButton
        isMobile={isMobile}
        handleMenuToggle={handleMenuToggle}
        handleMenuToggleMobile={handleMenuToggleMobile}
      />
      <BoxWrapper open={view} mobile={isMobile ? 'true' : undefined}>
        {isMobile ? (
          <>
            {viewMobile ? (
              <MobileMenu
                open={viewMobile}
                onClose={handleMenuToggleMobile}
                onOpen={handleMenuToggleMobile}
                items={items}
              />
            ) : null}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
              <Box
                sx={{
                  background: '#ffff',
                  border: '1px solid #E4E5E6',
                  borderRadius: '5px',
                  p: 2,
                }}>
                <FormControl fullWidth>
                  <InputLabel>Источник карт</InputLabel>
                  <Select value={maps} label="Источник карт" onChange={handleChangeMaps}>
                    <MenuItem value={'yandex'}>Яндекс</MenuItem>
                    <MenuItem value={'cesium'}>Cesium</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                className="wrapper"
                sx={{
                  overflow: 'auto',
                  maxHeight: '500px',
                  background: '#ffff',
                  border: '1px solid #E4E5E6',
                  borderRadius: '5px',

                  p: 2,
                }}>
                <Typography variant="h6" noWrap component="div">
                  Транспортное средство
                </Typography>

                <Search />
                <List items={items} />
                <List items={items} />
                <List items={items} />
                <List items={items} />
              </Box>
            </Box>
          </>
        )}
      </BoxWrapper>
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
    <Box
      className="box-button"
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
      }}>
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
