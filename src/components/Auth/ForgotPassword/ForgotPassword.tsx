import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import { Container, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Box, Link, Stack } from '@mui/material';
import { Backdrop, Button, CircularProgress, Divider } from '@mui/material';

import logo from '@app/assets/logo.webp';

export function ForgotPassword() {
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
    setChangePassword(!changePassword);
  };
  const handleChangePassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setChangePassword(true);
    }, 2000);
  };
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Stack direction="column" spacing={1}>
        <Container
          sx={{
            maxHeight: '100vh',
            overflow: 'auto',
          }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box
              sx={{
                width: '100%',
                height: '100px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundImage: `url(${logo})`,
              }}
            />
            {!changePassword ? (
              <Box>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Grid container>
                  <Grid item xs>
                    <Link
                      color={'#68B5B9'}
                      component={NavLink}
                      to="/auth/login"
                      variant="body2">
                      Войти
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      color="#1F1F1F"
                      component={NavLink}
                      to="/auth/register"
                      variant="body2">
                      Регистрация
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  disableElevation
                  type="button"
                  onClick={handleChangePassword}
                  fullWidth
                  variant="contained"
                  sx={{ my: 2, background: '#1F1F1F' }}>
                  Восстановить
                </Button>
                <Divider sx={{ mb: 1 }} />
              </Box>
            ) : (
              <CheckMailbox />
            )}
          </Box>
        </Container>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Stack>
    </Box>
  );
}
function CheckMailbox() {
  return (
    <Box
      sx={{
        width: '256px',
      }}>
      <Stack direction="column" alignItems="start" justifyContent="start" spacing={5}>
        <Stack direction="row" alignItems="center" justifyContent="start" spacing={1}>
          <EmailIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center',
            }}
          />
          <Typography variant="h6">Проверьте почту</Typography>
        </Stack>
        <Typography variant="body1">
          Вам будет выслано письмо с инструкциями для восстановления пароля
        </Typography>
      </Stack>
    </Box>
  );
}
