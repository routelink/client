import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { Box, Button, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { Cesium, Menu, Yandex } from '@app/components/Maps';
import { TMaps } from '@app/models';
import { useStore } from '@app/store';

import { items as fakeItems } from './transport.fake';

const style = {
  box: {
    background: '#F1F3F4',
    '--header-height': '64px',
    '--header-height-mobile': '56px',
    height: `calc(100vh - (var(--header-height) + 2.7rem)) `,
    '@media (maxWidth: 768px)': {
      height: `calc(100vh - (var(--header-height-mobile) + 1.75rem )`,
    },
  },
};

export function Maps() {
  const { mapsStore } = useStore();

  useEffect(() => {
    if (mapsStore.maps === 'cesium') {
      const container = document.getElementById('cesium');
      const root = createRoot(container!);
      root.render(<Cesium />);
    }
  }, [mapsStore.maps]);

  const items = fakeItems;
  const handleChangeMaps = (event: SelectChangeEvent) =>
    (mapsStore.maps = event.target.value as TMaps);

  return (
    <Observer>
      {() => {
        return (
          <Stack
            spacing={2}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box style={{ ...style.box }} sx={{ position: 'relative' }}>
              <Menu
                items={items}
                maps={mapsStore.maps}
                handleChangeMaps={handleChangeMaps}
              />
              {mapsStore.maps === 'yandex' ? <Yandex /> : <div id="cesium"> </div>}
            </Box>
            <></>

            <Button fullWidth variant="contained">
              Начать движение
            </Button>
          </Stack>
        );
      }}
    </Observer>
  );
}
