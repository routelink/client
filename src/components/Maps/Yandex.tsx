import {
  Map,
  Placemark,
  RulerControl,
  TypeSelector,
  YMaps,
} from '@pbe/react-yandex-maps';
import { Observer } from 'mobx-react-lite';
import { IMapState } from 'yandex-maps';

import { Box } from '@mui/material';

import { IMetrica } from '@app/models';
import { useStore } from '@app/store';

export function Yandex() {
  const { mapsStore } = useStore();
  return (
    <Observer>
      {() => {
        const defaultState: IMapState = {
          center: [
            mapsStore.coords.coords?.latitude ?? 55.751574,
            mapsStore.coords.coords?.longitude ?? 37.573856,
          ],
          zoom: 10,
        };
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

                {mapsStore.coords?.coords?.latitude &&
                mapsStore.coords?.coords?.longitude ? (
                  <Placemark
                    options={{
                      preset: 'islands#redCircleDotIcon',
                    }}
                    geometry={[
                      mapsStore?.coords?.coords?.latitude,
                      mapsStore?.coords?.coords?.longitude,
                    ]}
                  />
                ) : null}
              </Map>
            </YMaps>
          </Box>
        );
      }}
    </Observer>
  );
}
