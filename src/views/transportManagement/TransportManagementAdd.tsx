import React, { useState } from 'react';
import { Container, TextField, MenuItem, Typography, Button } from '@mui/material';

const VehicleForm = ({ onApply }) => {
  const [formValues, setFormValues] = useState({
    type_id: '',
    reg_number: '',
    mileage: '',
    created_at: Date.now(),
  });

  const vehicleTypes = [
    { label: 'Car', value: 'car' },
    { label: 'Truck', value: 'truck' },
    // Add more vehicle types here if needed
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(formValues);
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
          name="type_id" // This must match the state object's property name
          value={formValues.type_id}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          variant="outlined">
          {vehicleTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Гос. номер *"
          name="reg_number" // This must match the state object's property name
          value={formValues.reg_number}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Пробег *"
          name="mileage" // This must match the state object's property name
          value={formValues.mileage}
          onChange={handleChange}
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
