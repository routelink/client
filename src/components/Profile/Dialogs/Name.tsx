import { useState } from 'react';

import { Button, DialogActions, TextField } from '@mui/material';

import { useStore } from '@app/store';

//import { useEffect } from 'react';

export function NameDialog({
  handleClose,
  name,
}: {
  name: string;
  handleClose: () => void;
}) {
  const { profileStore } = useStore();
  /*
useEffect(() => {
    profileStore.getProfile();
    window.scrollTo(0, 0);
  }, []);
*/
  const [value, setValue] = useState(name);
  const handleSave = () => {
    profileStore.changeName(value);
    console.log('save: ', value);
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
