import Button from '@mui/material/Button';
import { Stack } from '@mui/material'

export function AddEmployeeButton() {
  return (
    <Stack direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing="10px">
      <Button variant="contained" sx={{ fontSize: "30px",
            background: "#315556",
            borderRadius: "50%",
            height: "56px",
            width: "56px" }}>
      +
      </Button>
      <span>Сотрудник</span>
    </Stack>

  );
}

