import { useColumns } from './useColumns.ts';
import { RLTableProps } from '@app/ui/table/types.ts';
import { useProperties } from '@app/ui/table/hooks/useProperties.ts';
import { useTableState } from '@app/ui/table/hooks/useState.ts';
import { useActions } from '@app/ui/table/hooks/useActions.ts';
import { useDialog } from '@app/ui/table/hooks/useDialog.ts';
import { useDataGetters } from '@app/ui/table/hooks/useDataGetters.ts';
import { useData } from '@app/ui/table/hooks/useData.ts';

export const useTable = (props: RLTableProps) => {
  const {
    rowKeyName,
    isChoiceMode,
    isMultipleChoice,
    hasRemoveCommand,
    hasEditCommand,
  } = useProperties(props);
  const {
    setRowEditProps,
    setSelectedRowKeys,
    setActiveRowKey,
    activeRowKey,
    setSortColumn,
    sortColumn,
    getActiveRowKey,
    rowEditProps,
    selectedRowKeys,
  } = useTableState(props);
  const { dialogPosition, dialogRef, showDialog, setShowDialog } =
    useDialog(props);
  const { dataGetter, getCellData, getHeaderCellData, isRowSelected } =
    useDataGetters(props, { rowKeyName, selectedRowKeys });
  const { data, allRowKeys } = useData(props);
  const {
    activateRow,
    addRow,
    cellClick,
    editRow,
    headerSelect,
    removeRow,
    saveRow,
    selection,
    selectRow,
    sort,
    editEnd,
    openDialog,
    cellDoubleClick,
  } = useActions(props, {
    dialogRef,
    rowKeyName,
    setRowEditProps,
    setSelectedRowKeys,
    selectedRowKeys,
    setActiveRowKey,
    setShowDialog,
    showDialog,
    isMultipleChoice,
    getActiveRowKey,
    sortColumn,
  });
  const { columns } = useColumns(props, {
    isChoiceMode: true,
    isMultipleChoice: true,
    rowKeyName,
    sortColumn,
    hasRemoveCommand,
    hasEditCommand,
    cellClick,
    cellDoubleClick,
    allRowKeys,
    selectRow,
    dataGetter,
    editRow,
    removeRow,
    isRowSelected,
  });

  return { columns, data };
};
