import {
  ExtendedColumn,
  RowType,
  KeyType,
  ColumnType,
} from '@app/ui/table/types.ts';
import React from 'react';
import { Checkbox, Icon, TableCell } from '@mui/material';
import { Edit } from '@mui/icons-material';

export type TableBodyCellProps = {
  column: ExtendedColumn;
  row: RowType;
  rowKey: KeyType;
};
type CheckboxProps = {
  value: boolean;
  disabled?: boolean;
  label?: string;
  showCheckbox?: boolean;
};

const TableBodyCell: React.FC<TableBodyCellProps> = (
  props: TableBodyCellProps,
) => {
  if (props === undefined) debugger;
  const doClick = (e: MouseEvent, p: TableBodyCellProps) => {
    e && e.stopPropagation();
    p.column.emitEvents.click(e, p.row, p.rowKey);
  };

  const renderCheckbox = (_props: TableBodyCellProps, checked: boolean) => {
    if (checked === null) return;
    const checkboxProps: CheckboxProps = {
      value: checked,
      disabled: !props.column.operationColumn,
    };
    return (
      <Checkbox
        checked={checkboxProps.value}
        disabled={checkboxProps.disabled}
        onChange={() => doClick(null as any, _props)}
      ></Checkbox>
    );
  };

  const renderDefault = (_props: TableBodyCellProps, cellData: any) => {
    if (!cellData) return;

    if (typeof cellData === 'string') {
      return cellData;
    }
  };

  const renderIcon = (_props: TableBodyCellProps, cellData: any) => {
    if (!cellData) return;

    const icon = cellData.icon;
    return <Icon onClick={(e: MouseEvent) => doClick(e, props)}>{icon}</Icon>;
  };

  const cellDataNeded = (type: ColumnType) =>
    type === 'checkbox' ||
    type === 'default' ||
    type === 'icon' ||
    type === 'radio';

  let cellData = null;
  let cell = null;

  if (cellDataNeded(props.column.type)) {
    cellData = props.column.getCellData(props.column, props.row, props.rowKey);
  }

  switch (props.column.type) {
    case 'checkbox':
      cell = renderCheckbox(props, cellData);
      break;
    case 'default':
      cell = renderDefault(props, cellData);
      break;
    case 'icon':
      cell = renderIcon(props, cellData);
      break;

    default:
      cell = undefined;
  }
  return <TableCell component={'td'}>{cell}</TableCell>;
};
export default TableBodyCell;
