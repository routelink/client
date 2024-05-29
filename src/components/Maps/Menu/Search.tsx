import { Observer } from 'mobx-react-lite';

import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';

import { useStore } from '@app/store';

export function Search() {
  const { mapsStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Box
            className="Search-box"
            sx={{ display: 'flex', flexDirection: 'row', p: 1, gap: 1, width: '100%' }}>
            <TextField
              fullWidth
              sx={{ width: '100%' }}
              onChange={(e) => (mapsStore.search = e.target.value)}
              value={mapsStore.search}
              id="standard-basic"
              label="Быстрый поиск..."
              variant="standard"
            />

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit">
              <SearchIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
              />
            </IconButton>
          </Box>
        );
      }}
    </Observer>
  );
}
