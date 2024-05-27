import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Button, Divider } from '@mui/material';

import { Backdrop } from '@app/components/Auth/Backgrop';

export function ChangePassword() {
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (_: FormEvent<HTMLFormElement>) => {
    setChangePassword(!changePassword);
  };
  const navigate = useNavigate();
  const handleChangePassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setChangePassword(true);
      navigate('/auth/login');
    }, 2000);
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {!changePassword ? (
          <Box>
            <TextField
              fullWidth
              margin="normal"
              required
              id="password"
              label="Пароль"
              type="password"
              name="password"
              autoFocus
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="password2"
              label="Повторите пароль"
              type="password"
              name="password2"
            />
            <Button
              disableElevation
              type="button"
              onClick={handleChangePassword}
              fullWidth
              variant="contained"
              sx={{ my: 2, background: '#1F1F1F' }}>
              Изменить пароль
            </Button>
            <Divider sx={{ mb: 1 }} />
          </Box>
        ) : null}
        <Backdrop open={isLoading} />
      </Box>
    </>
  );
}
