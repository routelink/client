import { UsePropertiesReturn } from '@app/ui/table/hooks/useProperties.ts';
import {
  ColumnType,
  ExtendedColumn,
  RLTableProps,
  TableColumn,
  TableRow,
} from '@app/ui/table/types.ts';
import { UseTableStateReturn } from '@app/ui/table/hooks/useState.ts';

type UseDataGettersProps = {
  selectedRowKeys: UseTableStateReturn['selectedRowKeys'];
  rowKeyName: UsePropertiesReturn['rowKeyName'];
};

export const useDataGetters = (
  props: RLTableProps,
  { selectedRowKeys, rowKeyName }: UseDataGettersProps,
) => {
  const dataGetter = (type: ColumnType) => {
    switch (type) {
      case 'icon':
        return getIconCellProps;
      case 'default':
        return getCellData;
    }
  };

  const checked = { checked: true, indeterminate: false };
  const unchecked = { checked: false, indeterminate: false };
  const indeterminate = { checked: false, indeterminate: true };

  const getHeaderCellData = () => {
    if (!props.data?.length) return unchecked;
    if (!selectedRowKeys.length) return unchecked;

    let rows: TableRow[] = [];

    rows = props.data || [];

    let hasChecked = false;
    let hasUnchecked = false;
    rows.forEach((row) => {
      if (selectedRowKeys.includes(row[rowKeyName] as KeyType)) {
        hasChecked = true;
      } else {
        hasUnchecked = true;
      }
      if (hasChecked && hasUnchecked) return indeterminate;
    });

    if (hasChecked && !hasUnchecked) return checked;
    if (!hasChecked && hasUnchecked) return unchecked;
    return indeterminate;
  };

  const getCheckboxCellData = () => {};

  const getIconCellProps = (column: TableColumn, row: TableRow) => {
    return column.props;
  };

  const getCellData = (column: TableColumn, row: TableRow): any => {
    const _column = column as ExtendedColumn;
    const field = _column.field;
    if (!field) return '';
    const cellData = row[field];

    return cellData || '';
  };

  const isRowSelected = (
    column: TableColumn,
    row: TableRow,
    rowKey: KeyType,
  ) => {
    return selectedRowKeys.includes(rowKey);
  };

  return {
    dataGetter,
    getCellData,
    getHeaderCellData,
    isRowSelected,
  };
};

export type UseDataGettersReturn = ReturnType<typeof useDataGetters>;
