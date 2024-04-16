import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { Backdrop, Button, CircularProgress, Divider } from '@mui/material';

import logo from '@app/assets/logo.webp';

export function ChangePassword() {
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
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
