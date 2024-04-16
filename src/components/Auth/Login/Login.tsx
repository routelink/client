import { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Box, Grid, Stack } from '@mui/material';
import { Backdrop, Button, CircularProgress, Divider, Link } from '@mui/material';

import logo from '@app/assets/logo.webp';

export function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
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
        <Container>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: '256px',

              mt: 1,
            }}>
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
            <TextField
              fullWidth
              margin="normal"
              required
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item xs>
                <Link
                  color={'#68B5B9'}
                  component={NavLink}
                  to="/auth/forgot-password"
                  variant="body2">
                  Забыли пароль?
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ my: 2, background: '#1F1F1F' }}>
              Войти
            </Button>
            <Divider sx={{ mb: 1 }} />
          </Box>
        </Container>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={false}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Stack>
    </Box>
  );
}
