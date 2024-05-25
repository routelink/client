import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Box } from '@mui/material';

import { useStore } from '@app/store';

import { AddEmployeeButton } from './AddEmployeeButton';

export function Employees() {
  const { employeesStore } = useStore();
  useEffect(() => {
    employeesStore.getCollection();
  }, []);

  return (
    <Observer>
      {() => {
        return (
          <Box>
            <AddEmployeeButton />
          </Box>
        );
      }}
    </Observer>
  );
}
