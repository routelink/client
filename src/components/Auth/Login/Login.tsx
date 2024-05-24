import { Observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Button, Divider, Link } from '@mui/material';

import { useStore } from '@app/store';

export function Login() {
  const { authStore } = useStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    authStore
      .login(data.get('login') as string, data.get('password') as string)
      .catch((error) => console.error(error));
  };

  return (
    <Observer>
      {() => {
        return (
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={authStore.isAuthProgress}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        );
      }}
    </Observer>
  );
}
