import React from 'react';

import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';

interface StepperProps {
  step: number;
  setStep: (value: number) => void;
}

const ServicesStepper: React.FC<StepperProps> = ({ step, setStep }) => {
  const handleIncrement = () => {
    setStep(Math.min(step + 1, 100));
  };

  const handleDecrement = () => {
    setStep(Math.max(step - 1, 0));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= 0 && newValue <= 100) {
      setStep(newValue);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleDecrement}>
        <Remove />
      </IconButton>
      <TextField
        type="number"
        value={step}
        onChange={handleChange}
        inputProps={{ min: 0, max: 100, step: 1 }}
        variant="outlined"
        size="small"
      />
      <IconButton onClick={handleIncrement}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default ServicesStepper;
