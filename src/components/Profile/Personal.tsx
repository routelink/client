import { Avatar, Box, Button, Typography } from '@mui/material';
import {
  Dialog,
  AvatarDialog,
  NameDialog,
  PasswordDialog,
} from '@app/components/Profile/Dialogs';
import { useState } from 'react';

export function Personal() {
  const [openAvatar, setOpenAvatar] = useState(false);
  const handleOpenAvatar = () => {
    setOpenAvatar(true);
  };
  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };

  const [openName, setOpenName] = useState(false);
  const handleOpenName = () => {
    setOpenName(true);
  };
  const handleCloseName = () => {
    setOpenName(false);
  };

  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => {
    setOpenPassword(true);
  };
  const handleClosePassword = () => {
    setOpenPassword(false);
  };
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
        Личная информация
      </Typography>
      <Box
        className="info"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '38px',
        }}>
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
        <Typography variant="subtitle1">iivanov@gmail.com</Typography>
      </Box>
      <Box
        className="button-list"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '50px',
        }}>
        <Button variant="text" onClick={handleOpenAvatar}>
          Изменить аватар
        </Button>
        <Dialog
          open={openAvatar}
          handleClose={handleCloseAvatar}
          title="Изменить аватар"
          content={<AvatarDialog handleClose={handleCloseAvatar} />}
        />
        <Button variant="text" onClick={handleOpenName}>
          Изменить ФИО
        </Button>
        <Dialog
          open={openName}
          handleClose={handleCloseName}
          title="Изменить ФИО"
          content={<NameDialog handleClose={handleCloseName} name="Иванов И.И." />}
        />
        <Button variant="text" onClick={handleOpenPassword}>
          Изменить пароль
        </Button>
        <Dialog
          open={openPassword}
          handleClose={handleClosePassword}
          title="Изменить пароль"
          content={<PasswordDialog handleClose={handleClosePassword} />}
        />
      </Box>
    </Box>
  );
}
