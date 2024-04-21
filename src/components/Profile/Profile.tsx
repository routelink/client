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
            pt: '1rem',
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
              height: '100%',
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
