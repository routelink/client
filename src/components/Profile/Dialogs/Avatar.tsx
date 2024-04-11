import {
  Avatar,
  Box,
  Button,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';

export function AvatarDialog({ handleClose }: { handleClose: () => void }) {
  const handleSave = () => {
    console.log('save');
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7 }}>
        <Box
          className="info"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '12px',
          }}>
          <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
          <Typography variant="subtitle1">Иванов И.И.</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '12px',
          }}>
          <IconButton aria-label="delete">
            <CloseIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <UploadIcon />
          </IconButton>
        </Box>
      </Box>
      <DialogActions>
        <Button sx={{ color: '#0E0E0E' }} onClick={handleClose}>
          Отмена
        </Button>
        <Button disabled={true} sx={{ color: '#0E0E0E' }} onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}
