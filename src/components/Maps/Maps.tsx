import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';

import { Box, Button, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { Cesium, Menu, Yandex } from '@app/components/Maps';
import { IMetrica, TMaps } from '@app/models';
import { useStore } from '@app/store';

import { items as fakeItems } from './transport.fake';

const socket = io(import.meta.env.VITE_APP_BASE_URL);

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
  const [position, setPosition] = useState<GeolocationPosition>(
    {} as GeolocationPosition,
  );

  if (navigator.geolocation)
    navigator.geolocation.watchPosition((coods: GeolocationPosition) => {
      setPosition(coods);
    });

  socket.on('metrics:update:item', (data: IMetrica) => {
    mapsStore.addPoint(data);
  });

  useEffect(() => {
    if (mapsStore.isMove) {
      socket.emit('metrics:update:create', {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        transportId: '123',
        userId: 1,
      });
    } else {
      socket.off('metrics:update:create');
    }
  }, [mapsStore.isMove, position?.coords?.latitude, position?.coords?.longitude]);

  useEffect(
    () => mapsStore.setCoords(position),
    [position?.coords?.latitude, position?.coords?.longitude],
  );

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
            <Button fullWidth onClick={() => mapsStore.switchMove()} variant="contained">
              {!mapsStore.isMove ? 'Начать' : 'Остановить'}
              движение
            </Button>
          </Stack>
        );
      }}
    </Observer>
  );
}
