import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import { Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Box, Link, Stack } from '@mui/material';
import { Button, Divider } from '@mui/material';

import { Backdrop } from '@app/components/Auth/Backgrop';

export function ForgotPassword() {
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (_: FormEvent<HTMLFormElement>) => {
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
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              <Link color={'#68B5B9'} component={NavLink} to="/login" variant="body2">
                Войти
              </Link>
            </Grid>
            <Grid item>
              <Link color="#1F1F1F" component={NavLink} to="/register" variant="body2">
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
      <Backdrop open={isLoading} />
    </Box>
  );
}
function CheckMailbox() {
  return (
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
  );
}
