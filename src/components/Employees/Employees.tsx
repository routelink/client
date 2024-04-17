import { Stack } from '@mui/material';

import { AddEmployeeButton } from './AddEmployeeButton';
import { EMTable } from './emTable';

export function Employees() {
  return (
    <Stack direction="column" spacing="10px">
      <AddEmployeeButton />
      <EMTable />
    </Stack>
  );
}
