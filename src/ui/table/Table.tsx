import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { RLTableProps } from '@app/ui/table/types.ts';
import { useTable } from '@app/ui/table/hooks/useTable.ts';
import TableHeaderRow from './renderers/TableHeaderRow';
import TableBodyRow from '@app/ui/table/renderers/TableBodyRow.tsx';

const RLTable: React.FC<RLTableProps> = (props) => {
  const { columns, data } = useTable(props);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeaderRow columns={columns}></TableHeaderRow>
        <TableBody>
          {data.rows.map((row) => (
            <TableBodyRow
              rowKeyName={props.rowKeyName}
              row={row}
              columns={columns}
            ></TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RLTable;
