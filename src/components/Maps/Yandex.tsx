import {
  YMaps,
  Map,
  Placemark,
  RulerControl,
  TypeSelector,
} from '@pbe/react-yandex-maps';
import { Box } from '@mui/material';

export function Yandex() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10,
    controls: [],
  };
  const handleClick = () => {
    console.log('you clicked on the Placemark');
  };
  return (
    <>
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
            <Placemark
              onClick={handleClick}
              options={{}}
              geometry={[55.684758, 37.738521]}
            />
          </Map>
        </YMaps>
      </Box>
    </>
  );
}
