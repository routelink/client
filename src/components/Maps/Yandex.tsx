import {
  Map,
  Placemark,
  RulerControl,
  TypeSelector,
  YMaps,
} from '@pbe/react-yandex-maps';
import { Observer } from 'mobx-react-lite';

import { Box } from '@mui/material';

import { IMetrica } from '@app/models';
import { useStore } from '@app/store';

export function Yandex() {
  const { mapsStore } = useStore();

  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 1,
  };

  return (
    <Observer>
      {() => {
        return (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}>
            <YMaps>
              <Map width={'100%'} height={'100%'} defaultState={defaultState}>
                <TypeSelector />
                <RulerControl />
                {mapsStore.points.map((point: IMetrica) => (
                  <Placemark
                    key={point.transportId}
                    geometry={[point.coords.latitude, point?.coords?.longitude]}
                  />
                ))}

                <Placemark
                  options={{
                    preset: 'islands#redCircleDotIcon',
                  }}
                  geometry={[
                    mapsStore.coords.coords?.latitude,
                    mapsStore.coords?.coords?.longitude,
                  ]}
                />
              </Map>
            </YMaps>
          </Box>
        );
      }}
    </Observer>
  );
}
