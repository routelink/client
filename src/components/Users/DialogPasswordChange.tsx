import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { IUser } from '@app/models';
import { useStore } from '@app/store';

export interface DialogPasswordChangeProps {
  isOpen: boolean;
  userId: number;
  setClose: () => void;
  onPasswordChangeEnd?: () => void;
}
export function DialogPasswordChange(props: DialogPasswordChangeProps) {
  const { isOpen, userId, setClose, onPasswordChangeEnd } = props;
  const { usersStore } = useStore();
  const [password, setPassword] = useState('');
  const selectedUser: IUser | undefined = usersStore.getUser(userId);

  if (!selectedUser) {
    props.setClose();
    return <></>;
  }

  const handleChange = () => {
    usersStore.update(props.userId, { password: password });
    setClose();

    if (onPasswordChangeEnd) {
      onPasswordChangeEnd();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={setClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>Изменение пароля</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пользователь: "{selectedUser.username}" ({selectedUser.email})
          </DialogContentText>
          <TextField
            fullWidth
            required
            variant="standard"
            type="password"
            label="Новый пароль"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={setClose}>
            Отмена
          </Button>
          <Button autoFocus onClick={handleChange} disabled={password.trim() === ''}>
            Установить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
