import { useState } from 'react';

import { Button, DialogActions, TextField } from '@mui/material';

import { useStore } from '@app/store';

export function NameDialog({ handleClose }: { name: string; handleClose: () => void }) {
  const { profileStore } = useStore();
  const { user } = profileStore;
  const [value, setValue] = useState(user?.username);
  const handleSave = () => {
    if (value !== undefined) {
      profileStore.changeUsername({ username: value });
      handleClose();
    }
    handleClose();
  };
  return (
    <>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="standard-basic"
        variant="standard"
      />
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </>
  );
}
