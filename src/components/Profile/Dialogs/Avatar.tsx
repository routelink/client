import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';

import iivanovAvatar from '@app/assets/iivanov.jpg';

export function AvatarDialog({ handleClose }: { handleClose: () => void }) {
  const handleSave = () => {
    console.log('save');
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
        }}>
        <Box
          className="info"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '0.5rem',
          }}>
          <Avatar alt="Иванов И.И." src={iivanovAvatar} />
          <Typography variant="subtitle1">Иванов И.И.</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '0.5rem',
          }}>
          <IconButton aria-label="delete">
            <CloseIcon />
          </IconButton>
          <IconButton aria-label="upload">
            <UploadIcon />
          </IconButton>
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button disabled={true} onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}
