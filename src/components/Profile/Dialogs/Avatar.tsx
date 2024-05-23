import { Observer } from 'mobx-react-lite';

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

import { useStore } from '@app/store';

//import avatar from '@app/assets/iivanov.jpg';

export function AvatarDialog({ handleClose }: { handleClose: () => void }) {
  const { profileStore } = useStore();
  const { user } = profileStore;

  const handleSave = () => {
    console.log('save');
    profileStore.changeAvatar('test');
    handleClose();
  };
  return (
    <Observer>
      {() => {
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
                <Avatar alt={user?.name} src={profileStore.data.avatar} />
                <Typography variant="subtitle1">{user?.name}</Typography>
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
      }}
    </Observer>
  );
}
