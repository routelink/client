import { useState } from 'react';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

import iivanovAvatar from '@app/assets/iivanov.jpg';
import {
  AvatarDialog,
  Dialog,
  NameDialog,
  PasswordDialog,
} from '@app/components/Profile/Dialogs';

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
        flexGrow: 1,
        gap: '2rem',
        p: '2rem',
      }}>
      <Typography variant="h6">Личная информация</Typography>
      <Grid
        container
        sx={{
          gap: '2rem',
        }}>
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
            <Avatar alt="Иванов И.И." src={iivanovAvatar} />
            <Typography variant="subtitle1">Иванов И.И.</Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            alignContent: 'center',
          }}>
          <Typography variant="subtitle1">iivanov@gmail.com</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          gap: '2rem',
        }}>
        <Grid item>
          <Button variant="text" onClick={handleOpenAvatar}>
            Изменить аватар
          </Button>
          <Dialog
            open={openAvatar}
            handleClose={handleCloseAvatar}
            title="Изменить аватар"
            content={<AvatarDialog handleClose={handleCloseAvatar} />}
          />
        </Grid>
        <Grid item>
          <Button variant="text" onClick={handleOpenName}>
            Изменить ФИО
          </Button>
          <Dialog
            open={openName}
            handleClose={handleCloseName}
            title="Изменить ФИО"
            content={<NameDialog handleClose={handleCloseName} name="Иванов И.И." />}
          />
        </Grid>
        <Grid item>
          <Button variant="text" onClick={handleOpenPassword}>
            Изменить пароль
          </Button>
          <Dialog
            open={openPassword}
            handleClose={handleClosePassword}
            title="Изменить пароль"
            content={<PasswordDialog handleClose={handleClosePassword} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
