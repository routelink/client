import {
  Box,
  Button,
  DialogActions,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function PasswordDialog({ handleClose }: { handleClose: () => void }) {
  const handleSummit = () => {
    console.log('summit');
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <>
      <Box
        component={'form'}
        onSubmit={handleSummit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Текущий пароль</InputLabel>
          <OutlinedInput
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type={showCurrentPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowCurrentPassword} edge="end">
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Текущий пароль"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Новый пароль</InputLabel>
          <OutlinedInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showNewPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowNewPassword}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Новый пароль"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
          <OutlinedInput
            error={newPassword !== confirmPassword}
            color={newPassword !== confirmPassword ? 'error' : 'success'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Повторите пароль"
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button disabled={newPassword !== confirmPassword} type="submit">
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    </>
  );
}
