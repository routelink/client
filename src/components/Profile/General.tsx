import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { useStore } from '@app/store';

export function General() {
  const { profileStore } = useStore();

  useEffect(() => {
    profileStore.getProfile();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Observer>
      {() => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              gap: '2rem',
              p: '2rem',
            }}>
            <Typography variant="h6">Основные параметры</Typography>
            <Grid
              container
              sx={{
                gap: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
              }}>
              {profileStore.user?.organization?.name && (
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                    <Typography variant="subtitle1">Организация</Typography>
                    <Typography variant="subtitle1">
                      "{profileStore?.user?.organization?.name}"
                    </Typography>
                  </Box>
                </Grid>
              )}

              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                  <Typography variant="subtitle1">Роль</Typography>
                  <Typography variant="subtitle1">
                    "{profileStore?.user?.role?.name}"
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Observer>
  );
}
