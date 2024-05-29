import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';

import { Alert, Box, Button, Snackbar, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { Cesium, Menu, Yandex } from '@app/components/Maps';
import { IMetrica, TMaps } from '@app/models';
import { useStore } from '@app/store';

const socket = io(import.meta.env.VITE_APP_BASE_URL, { autoConnect: false });

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
  const { mapsStore, authStore } = useStore();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    socket.auth = { token: authStore.token };
    socket.connect();
  }, []);

  const [position, setPosition] = useState<GeolocationPosition>(
    {} as GeolocationPosition,
  );

  if (navigator.geolocation)
    navigator.geolocation.watchPosition(
      (coods: GeolocationPosition) => {
        setPosition(coods);
      },
      (error: GeolocationPositionError) => {
        if (error.code !== error.POSITION_UNAVAILABLE) {
          setError(
            POSITIONERROR_TYPE.find((item) => item.id === error.code)?.message ?? '',
          );
          mapsStore.isMove = false;
        }
      },
      { enableHighAccuracy: true },
    );

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
              <Menu maps={mapsStore.maps} handleChangeMaps={handleChangeMaps} />
              {mapsStore.maps === 'yandex' ? <Yandex /> : <div id="cesium"> </div>}
            </Box>
            <Button
              fullWidth
              onClick={() => mapsStore.switchMove()}
              disabled={!!error}
              variant="contained">
              {!mapsStore.isMove ? 'Начать' : 'Остановить'}
              движение
            </Button>
            <Snackbar
              open={!!error}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => setError(null)}>
              <Alert
                onClose={() => setError(null)}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          </Stack>
        );
      }}
    </Observer>
  );
}
const POSITIONERROR_TYPE = [
  {
    id: 1,
    message: `Не удалось получить информацию о геолокации, поскольку у страницы не было разрешения на это`,
  },
  {
    id: 2,
    message: `Не удалось получить геолокацию, поскольку по крайней мере один внутренний источник позиции вернул внутреннюю ошибку.`,
  },
  {
    id: 3,
    message: ` Время, разрешённое для получения геолокации, определяется PositionOptions.timeout информация была достигнута до получения информации`,
  },
];
