import { Observer } from 'mobx-react-lite';

import { Box, Typography } from '@mui/material';

import { useStore } from '@app/store';

export function List() {
  const { mapsStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Box>
            {mapsStore.points.map((item) => (
              <Box
                key={'car' + item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  width: '100%',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    gap: 1,
                    p: 1,

                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Typography fontSize={'1rem'} color={'#373838'}>
                    {item.transport.regNumber}
                  </Typography>
                  <Typography fontSize={'1rem'} color={'#808080'}>
                    {item.transport.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      }}
    </Observer>
  );
}
