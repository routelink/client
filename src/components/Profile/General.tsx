import { Box, Typography } from '@mui/material';

export function General() {
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
    </Box>
  );
}
