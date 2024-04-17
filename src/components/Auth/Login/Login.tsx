import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Button, Divider, Link } from '@mui/material';

import { Backdrop } from '@app/components/Auth/Backgrop';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  };
  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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
          <Link color="#1F1F1F" component={NavLink} to="/auth/register" variant="body2">
            Регистрация
          </Link>
        </Grid>
      </Grid>
      <Button
        disableElevation
        type="button"
        onClick={handleLogin}
        fullWidth
        variant="contained"
        sx={{ my: 2, background: '#1F1F1F' }}>
        Войти
      </Button>
      <Divider sx={{ mb: 1 }} />
      <Backdrop open={isLoading} />
    </Box>
  );
}
