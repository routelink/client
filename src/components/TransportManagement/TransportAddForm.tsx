import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

import { Button, Container, MenuItem, TextField, Typography } from '@mui/material';

import { ITransport } from '@app/models';
import { TRANSPORT_TYPES, v4Int } from '@app/utils';

export type TransportAddState = Pick<
  ITransport,
  'type' | 'regNumber' | 'mileage' | 'createdAt' | 'id'
>;

type TransportAddFormProps = {
  onApply: (state: TransportAddState) => void;
};
interface MaskedInputProps {
  mask: string;
  name?: string;
  onChange: (value: string) => void;
}
// @TODO возможно вынести позже
const MaskedInput = React.forwardRef<HTMLElement, MaskedInputProps>((props, ref) => {
  const { mask, onChange, ...other } = props;

  const setRef = (imaskInput: { el: HTMLElement } | null) => {
    if (imaskInput && ref) {
      // Ensure the ref is associated directly with the native input element
      (ref as React.RefCallback<HTMLElement>)(imaskInput.el);
    }
  };

  return (
    <IMaskInput
      mask={mask}
      onAccept={(_, mask) => onChange(mask.unmaskedValue)}
      overwrite
      {...other}
      ref={setRef} // Pass ref to IMaskInput
    />
  );
});
const VehicleForm: React.FC<TransportAddFormProps> = ({ onApply }) => {
  const [hasRegError, setHasRegError] = useState(false);
  const [type, setType] = useState<TransportAddState['type']>(TRANSPORT_TYPES[0]);
  const [regNumber, setRegNumber] = useState<TransportAddState['regNumber']>('');
  const [mileage, setMileage] = useState<TransportAddState['mileage']>('');
  const vehicleTypes = TRANSPORT_TYPES.map((i) => {
    return { id: i.id, value: i.name };
  });
  const validateRegNumber = () => {
    if (regNumber?.length && regNumber.length >= 7) {
      setHasRegError(false);
    } else {
      setHasRegError(true);
    }
  };

  const onSetTransportType = (value: TransportAddState['type']['id']) => {
    const vehicleType = TRANSPORT_TYPES.find((i) => i.id === value);
    vehicleType && setType(vehicleType);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (hasRegError) return;
    onApply({ type, regNumber, mileage, createdAt: new Date(), id: v4Int() });
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
          value={type.id}
          onChange={({ target }) => onSetTransportType(target.value as unknown as number)}
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

        <TextField
          label="Гос. номер"
          value={regNumber}
          required
          fullWidth
          error={hasRegError}
          helperText={hasRegError && 'Минимум 7 знаков'}
          onChange={(value: unknown) => setRegNumber(value as string)}
          onBlur={validateRegNumber}
          InputProps={{
            /* @ts-expect-error: input component error */
            inputComponent: MaskedInput,
            inputProps: {
              mask: '{A} 000 {AA} 00[0]', // '000' для цифр, 'AA' для букв, '[0]' для необязательной цифры'
              definitions: {
                // Указываем валидные значения для 'A' - это может быть любая из перечисленных букв
                A: /[АВЕКМНОРСТУХ]/i,
              },
              prepare: (str: string) => str.toUpperCase(), // Все буквы в верхнем регистреsk for date
            },
          }}
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
