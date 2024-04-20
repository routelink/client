import { Box, Container, Typography } from '@mui/material';

import { General, Personal } from './index';

export function Profile() {
  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            p: '1rem 0 0 0',
          }}>
          <Typography variant="h5">Профиль</Typography>
          <Box
            sx={{
              background: '#FFFFFF',
              border: '1px solid #CFCFCF',
              borderRadius: '0.2rem',
            }}>
            <Personal />
          </Box>
          <Box
            sx={{
              height: 'calc(100vh - 26rem)',
              background: '#FFFFFF',
              border: '1px solid #CFCFCF',
              borderRadius: '0.2rem',
            }}>
            <General />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
