import { UseColumnsReturn } from '@app/ui/table/hooks/useColumns.ts';

export type KeyType = string | number;

export type DataType = 'boolean' | 'hyperlink' | 'default';
export type ElementType = 'button' | 'default';
export type ColumnType = 'checkbox' | 'icon' | 'default' | 'radio';
export type TableColumn = {
  field?: string;
  title?: string;
  type: ColumnType;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string | number;
  dataType?: DataType;
  elementType?: ElementType;
};
export type ExtendedColumn = TableColumn & {
  key: KeyType;
  sortBy?: 'asc' | 'desc' | '';
  operationColumn?: boolean;
  getCellData: any;
  getHeaderCellData?: () => { checked: boolean; indeterminate: boolean };
  emitEvents?: any;
  clickAction?: any;
};
export type TableCell = string;
export type TableRow = Record<string, TableCell>;
export type SortColumn = {
  key: ExtendedColumn['key'];
  sortBy: ExtendedColumn['sortBy'];
};
export type SelectionMode = 'single' | 'multiple';
export type DialogPosition = 'left' | 'right' | 'center';
export type ClickAction = (row: TableRow, rowKey: KeyType) => void;
export type AvailableActionProps = {
  windowTitle?: string;
  actionTitle?: string;
  iconTitle?: string;
};
export type RowEditProps = {
  isAdd: boolean;
  title: string;
  saveLabel: string;
  columns: UseColumnsReturn['columns'];
  row: TableRow;
  rowKey: KeyType;
  defaultCloseBehaviour?: boolean;
  restored?: boolean;
};
export type RLTableProps = {
  columns: TableColumn[];
  data: [];
  sort?: boolean;
  rowKeyName: string;
  selectionMode?: SelectionMode;
  availableActions: {
    add: boolean | AvailableActionProps;
    edit: boolean | AvailableActionProps;
    remove: boolean | AvailableActionProps;
  };
  onRowAdd: (row: TableRow, rowKey: KeyType) => void;
  onRowChange: (row: TableRow, rowKey: KeyType) => void;
  onRowDelete: (row: TableRow, rowKey: KeyType) => void;
  onDataChange: (rows: TableRow[]) => void;
  dialogPosition?: DialogPosition;
};
