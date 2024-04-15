import { Box, Typography } from '@mui/material';

export function General() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        background: '#FFFFFF',
        border: '1px solid #CFCFCF',
        borderRadius: '5px',
        p: 4,
      }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#0E0E0E', fontWeight: 500, lineHeight: '23.44px' }}>
        Основные параметры
      </Typography>
    </Box>
  );
}
