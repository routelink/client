import { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { Yandex, Cesium, Menu } from '@app/components/Maps';
import { Box, Button } from '@mui/material';
import { items as fakeItems } from './transport.fake';
import { createRoot } from 'react-dom/client';

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
export type TMaps = 'yandex' | 'cesium';

export function Maps() {
  const [maps, setMaps] = useState<TMaps>('yandex');

  useEffect(() => {
    if (maps === 'cesium') {
      const container = document.getElementById('cesium');
      const root = createRoot(container!);
      root.render(<Cesium />);
    }
  }, [maps]);

  const items = fakeItems;
  const handleChangeMaps = (event: SelectChangeEvent) => {
    setMaps(event.target.value as TMaps);
    console.log(maps, event);
  };
  return (
    <>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box style={{ ...style.box }} sx={{ position: 'relative' }}>
          <Menu items={items} maps={maps} handleChangeMaps={handleChangeMaps} />
          {maps === 'yandex' ? <Yandex /> : <div id="cesium"> </div>}
        </Box>
        <></>

        <Button fullWidth variant="contained">
          Начать движение
        </Button>
      </Box>
    </>
  );
}
