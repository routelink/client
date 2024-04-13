import Button from '@mui/material/Button';

export function AddEmployeeButton() {
  return (
      <Button variant="contained"
      sx={{ fontSize: "30px",
            background: "#315556",
            borderRadius: "50%",
            height: "56px",
            width: "56px" }}>
      +
      </Button>
  );
}

