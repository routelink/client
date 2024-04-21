import { useState } from 'react';

import { Button, DialogActions, TextField } from '@mui/material';

export function NameDialog({
  handleClose,
  name,
}: {
  name: string;
  handleClose: () => void;
}) {
  const [value, setValue] = useState(name);
  const handleSave = () => {
    console.log('save: ', value);
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
