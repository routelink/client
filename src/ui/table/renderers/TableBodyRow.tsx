import { ExtendedColumn, RowType } from '@app/ui/table/types.ts';
import React from 'react';
import TableBodyCell from '@app/ui/table/renderers/TableBodyCell.tsx';
import { TableRow } from '@mui/material';

export type TableBodyRowProps = {
  row: RowType,
  columns: ExtendedColumn[]
  rowKeyName: string
}
const TableBodyRow: React.FC<TableBodyRowProps> = ({ rowKeyName, row, columns }) => {
  console.log(columns);
  const cells = columns.map(col =>
    <TableBodyCell
      column={col}
      row={row}
      rowKey={row[rowKeyName]}
    ></TableBodyCell>
  );
  console.log(cells);
  return (
    <TableRow>
      {cells}
    </TableRow>
  );
};
export default TableBodyRow;