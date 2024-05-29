import { Observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Button, Divider, Link } from '@mui/material';

import { useStore } from '@app/store';
import { IRegistrationData } from '@app/stores/auth';

export function Register() {
  return (
    <Observer>
      {() => {
        const { authStore } = useStore();

        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [password2, setPassword2] = useState('');
        const navigate = useNavigate();

        const [errors, setErrors] = useState({} as IRegistrationData);

        const validate = () => {
          const newErrors = {} as IRegistrationData;

          if (!username) {
            newErrors.username = 'ФИО обязательно';
          }

          if (!email) {
            newErrors.email = 'E-mail обязателен';
          } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Некорректный E-mail';
          }

          if (!password) {
            newErrors.password = 'Пароль обязателен';
          } /* else if (password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
          } */

          if (!password2) {
            newErrors.password2 = 'Повторите пароль';
          } else if (password !== password2) {
            newErrors.password2 = 'Пароли не совпадают';
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = (e: FormEvent) => {
          e.preventDefault();
          if (validate()) {
            authStore.registration({ username, email, password, password2 }).then(() => {
              navigate('/', { replace: true });
            });
          }
        };
        return (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              required
              id="username"
              label="ФИО"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="email"
              label="E-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Повторите пароль"
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              error={!!errors.password2}
              helperText={errors.password2}
            />
            <Grid container>
              <Grid item xs>
                <Link color={'#68B5B9'} component={NavLink} to="/login" variant="body2">
                  Уже зарегистрированы? Войти
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
        );
      }}
    </Observer>
  );
}
