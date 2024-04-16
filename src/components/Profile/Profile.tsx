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
            gap: 3,
          }}>
          <Typography variant="h5">Профиль</Typography>
          <Personal />

          <Box
            sx={{
              height: '100%',
              width: '100%',
              background: '#FFFFFF',
            }}>
            <General />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
