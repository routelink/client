import { Box, IconButton, Typography } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export function Header({ handleMenuToggle }: any) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
        className="header">
        <IconButton
          onClick={handleMenuToggle}
          size="large"
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
        <Typography variant="h6" noWrap component="div">
          Транспортное средство
        </Typography>
      </Box>
    </>
  );
}
