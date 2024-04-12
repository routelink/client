import React, { useState } from 'react';
import { Container, TextField, MenuItem, Typography, Button } from '@mui/material';
import { ITransport } from '@app/models';
import { TRANSPORT_TYPES } from '@app/utils/consts.ts';
import { IMaskMixin } from 'react-imask';

type State = Pick<ITransport, 'type' | 'regNumber' | 'mileage' | 'createdAt'>;

type VehicleFormProps = {
  onApply: (state: State) => void;
};

const VehicleForm: React.FC<VehicleFormProps> = ({ onApply }) => {
  const [type, setType] = useState<State['type']>({
    id: 1,
    name: '',
  });
  const [regNumber, setRegNumber] = useState<State['regNumber']>('');
  const [mileage, setMileage] = useState<State['mileage']>('');

  const vehicleTypes = TRANSPORT_TYPES.map((i) => {
    return { id: i.id, value: i.name };
  });
  const onSetTransportType = (value: any) => {
    const vehicleType = TRANSPORT_TYPES.find((i) => i.id === value);
    vehicleType && setType(vehicleType);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({ type, regNumber, mileage, createdAt: new Date() });
  };

  const IMaskPhoneInput = IMaskMixin(({ ...props }) => {
    return <TextField {...props} />;
  });

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
          value={type.id}
          onChange={({ target }) => onSetTransportType(target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined">
          {vehicleTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <IMaskPhoneInput
          label="Гос. номер *"
          name="regNumber" // This must match the state object's property name
          value={regNumber}
          onAccept={(value, mask) => setRegNumber(value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          mask={'+{7} (000) 000-00-00'}></IMaskPhoneInput>

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
