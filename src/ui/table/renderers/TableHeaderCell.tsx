import React, { ChangeEvent } from 'react';
import { ExtendedColumn, TableColumn, TableRow } from '@app/ui/table/types.ts';
import { Checkbox, TableCell } from '@mui/material';

export type HeaderCellProps = {
  column: ExtendedColumn
  rowKey: any
}
const renderCheckbox = (
  column: HeaderCellProps['column'],
  rowKey: HeaderCellProps['rowKey']
) => {
  const { checked, indeterminate } = column.getHeaderCellData
    ? column.getHeaderCellData()
    : { checked: false, indeterminate: false };
  const onChange = (val: boolean) => {
    column.emitEvents.check(val, column, rowKey);
  };
  const disabled = !column.operationColumn;
  return (<Checkbox checked={checked} indeterminate={indeterminate} disabled={disabled}
                    onChange={(_, checked) => onChange(checked)} />);

};
const TableHeaderCell: React.FC<HeaderCellProps> = ({column, rowKey}) => {
  const node = column.type === 'checkbox' ? renderCheckbox(column, rowKey) : column.title

  return (
    <TableCell component={'th'}>
      {node}
    </TableCell>
  )
};

export default TableHeaderCell