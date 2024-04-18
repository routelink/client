import { Box } from '@mui/material';

import { AddEmployeeButton } from './AddEmployeeButton';
import { EMTable } from './emTable';

export function Employees() {
  return (
    <Box paddingX={'20px'}>
      <AddEmployeeButton />
      <EMTable />
    </Box>
  );
}
