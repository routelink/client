import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Button, Divider, Link } from '@mui/material';

import { Backdrop } from '@app/components/Auth/Backgrop';

export function Register() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = () => {
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
        id="name"
        label="ФИО"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        fullWidth
        margin="normal"
        required
        id="login"
        label="Логин"
        name="login"
        autoComplete="login"
      />
      <TextField
        fullWidth
        margin="normal"
        required
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
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
      <TextField
        margin="normal"
        required
        fullWidth
        name="password2"
        label="Повторите пароль"
        type="password"
        id="password2"
        autoComplete="current-password"
      />
      <Grid container>
        <Grid item xs>
          <Link color={'#68B5B9'} component={NavLink} to="/auth/login" variant="body2">
            Уже зарегистрированы? Войти
          </Link>
        </Grid>
      </Grid>
      <Button
        disableElevation
        type="button"
        onClick={handleRegister}
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
