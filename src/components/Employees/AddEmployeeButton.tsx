import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

export function AddEmployeeButton() {
  return (
    <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={'18px'}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{margin:'20px 0px 20px 0px'}}
            // onClick={()=>{setAddEmployeeOpen(true)}}
            >
            <AddIcon />
          </Fab>
          <Typography sx={{ fontSize: '20px' }}>Сотрудник</Typography>
        </Box>
  );
}
