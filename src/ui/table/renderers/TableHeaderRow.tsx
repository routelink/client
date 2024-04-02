import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { UseColumnsReturn } from '@app/ui/table/hooks/useColumns.ts';
import TableHeaderCell from '@app/ui/table/renderers/TableHeaderCell.tsx';

type TableHeaderProps = {
  columns: UseColumnsReturn['columns']
}



const TableHeaderRow: React.FC<TableHeaderProps> = ({ columns }) => {
  const cols = columns.map((col) => (
    <TableHeaderCell key={col.key} column={col} ></TableHeaderCell>

  ));
  return (
    <TableHead>
      <TableRow>
        {cols}
      </TableRow>
    </TableHead>);

};
export default TableHeaderRow
