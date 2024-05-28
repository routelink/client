import { Observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

import {
  AvatarDialog,
  Dialog,
  NameDialog,
  PasswordDialog,
  Success,
} from '@app/components/Profile/Dialogs';
import { useStore } from '@app/store';

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

  const { profileStore } = useStore();

  useEffect(() => {
    profileStore.getProfile();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Observer>
      {() => {
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
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                  <Avatar alt={profileStore.user?.username} src={''} />
                  <Typography variant="subtitle1">
                    {profileStore?.user?.username}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  alignContent: 'center',
                }}>
                <Typography variant="subtitle1">{profileStore.user?.email}</Typography>
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
                  content={
                    <NameDialog
                      handleClose={handleCloseName}
                      name={profileStore.user?.username || ''}
                    />
                  }
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
            <Success />
          </Box>
        );
      }}
    </Observer>
  );
}
