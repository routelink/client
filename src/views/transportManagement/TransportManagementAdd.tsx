import React, { useState } from 'react';
import { Container, TextField, MenuItem, Typography, Button } from '@mui/material';
import { ITransport } from '@app/models';
import { TRANSPORT_TYPES } from '@app/utils/consts.ts';

type State = Pick<ITransport, 'type' | 'regNumber' | 'mileage' | 'createdAt'>;

type VehicleFormProps = {
  onApply: (state: State) => void;
};

const VehicleForm: React.FC<VehicleFormProps> = ({ onApply }) => {
  const [type, setType] = useState<State['type']>({
    id: 0,
    name: 'sss',
  });
  const [regNumber, setRegNumber] = useState<State['regNumber']>('');
  const [mileage, setMileage] = useState<State['mileage']>('');

  const vehicleTypes = TRANSPORT_TYPES.map((i) => {
    return { id: i.id, label: i.name.toUpperCase(), value: i.name };
  });
  const onSetTransportType = (value: any) => {
    const vehicleType = TRANSPORT_TYPES.find((i) => i.id === value);
    vehicleType && setType(vehicleType);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({ type, regNumber, mileage, createdAt: new Date() });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ margin: '24px 0' }}>
        Новое транспортное средство
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Транспортное средство *"
          name="type"
          value={type.name}
          onChange={({ target }) => onSetTransportType(target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined">
          {vehicleTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Гос. номер *"
          name="regNumber" // This must match the state object's property name
          value={regNumber}
          onChange={({ target }) => setRegNumber(target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Пробег *"
          name="mileage" // This must match the state object's property name
          value={mileage}
          onChange={({ target }) => setMileage(target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default VehicleForm;
