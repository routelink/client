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
    console.log('save: :', value);
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
        <Button sx={{ color: '#0E0E0E' }} onClick={handleClose}>
          Отмена
        </Button>
        <Button sx={{ color: '#0E0E0E' }} onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}
