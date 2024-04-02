import {
  ClickAction,
  ExtendedColumn,
  RLTableProps,
  TableRow,
} from '@app/ui/table/types.ts';
import { TableColumn } from '@app/ui/table/types.ts';
import { UsePropertiesReturn } from '@app/ui/table/hooks/useProperties.ts';
import { useMemo, useState } from 'react';
import { UseTableStateReturn } from '@app/ui/table/hooks/useState.ts';
import { UseActionsReturn } from '@app/ui/table/hooks/useActions.ts';
import { UseDataGettersReturn } from '@app/ui/table/hooks/useDataGetters.ts';
import { UseDataReturn } from '@app/ui/table/hooks/useData.ts';
import { Edit } from '@mui/icons-material';

type UseColumnsProps = {
  allRowKeys: UseDataReturn['allRowKeys'];
  sortColumn: UseTableStateReturn['sortColumn'];
  isChoiceMode: UsePropertiesReturn['isChoiceMode'];
  isMultipleChoice: UsePropertiesReturn['isMultipleChoice'];
  rowKeyName: UsePropertiesReturn['rowKeyName'];
  hasEditCommand: UsePropertiesReturn['hasEditCommand'];
  hasRemoveCommand: UsePropertiesReturn['hasRemoveCommand'];
  selectRow: UseActionsReturn['selectRow'];
  headerSelect: UseActionsReturn['headerSelect'];
  dataGetter: UseDataGettersReturn['dataGetter'];
  isRowSelected: UseDataGettersReturn['isRowSelected'];
  getHeaderCellData: UseDataGettersReturn['getHeaderCellData'];
  editRow: UseActionsReturn['editRow'];
  removeRow: UseActionsReturn['removeRow'];
  cellClick: UseActionsReturn['cellClick'];
  cellDoubleClick: UseActionsReturn['cellDoubleClick'];
};

export const useColumns = (
  props: RLTableProps,
  {
    allRowKeys,
    sortColumn,
    isChoiceMode,
    headerSelect,
    cellClick,
    cellDoubleClick,
    isMultipleChoice,
    rowKeyName,
    editRow,
    removeRow,
    hasEditCommand,
    dataGetter,
    getHeaderCellData,
    isRowSelected,
    hasRemoveCommand,
    selectRow,
  }: UseColumnsProps,
) => {
  const columnsSort = !!props.sort;

  const actionColumn = (
    icon: any,
    clickAction: ClickAction,
    fill?: string | boolean,
    title?: string,
  ): ExtendedColumn => {
    return {
      key: Math.random().toString(),
      type: 'icon',
      props: {
        icon: icon,
        ...(fill && { fill }),
        ...(title && { title }),
      },
      align: 'left',
      width: 36,
      clickAction,
      operationColumn: true,
      getCellData: dataGetter('icon'),
    } as TableColumn;
  };

  const selectionColumn = (multipleChoice: boolean) => {
    return {
      key: 'selection',
      type: multipleChoice ? 'checkbox' : 'radio',
      width: 36,
      align: 'center',
      clickAction: selectRow,
      getCellData: isRowSelected,

      operationColumn: true,
      ...(multipleChoice && {
        getHeaderCellData: getHeaderCellData,
      }),
    } as TableColumn;
  };

  const addLeftOperationColumns = (
    columns: TableColumn[],
    withActionColumns?: boolean,
  ) => {
    if (isChoiceMode) {
      columns.unshift(selectionColumn(isMultipleChoice));
    }

    // if (cellSelection.value) {
    //   columns.unshift(indexColumn());
    // }
    if (withActionColumns) {
      if (hasEditCommand) {
        columns.unshift(actionColumn('edit', editRow));
      }
      if (hasRemoveCommand) {
        columns.unshift(actionColumn('delete', removeRow, 'predator'));
      }
    }
  };
  const addRightOperationColumns = (columns: TableColumn[]) => {
    if (hasEditCommand) {
      columns.push(
        actionColumn(
          'edit',
          editRow,
          false,
          typeof props.availableActions?.edit === 'object'
            ? props.availableActions?.edit.iconTitle
            : undefined,
        ),
      );
    }
    if (hasRemoveCommand) {
      columns.push(
        actionColumn(
          'delete',
          removeRow,
          'predator',
          typeof props.availableActions?.edit === 'object'
            ? props.availableActions?.edit.iconTitle
            : undefined,
        ),
      );
    }
  };
  const addOperationColumns = (columns: TableColumn[]) => {
    addLeftOperationColumns(columns);
    addRightOperationColumns(columns);
    columns.map((col) => addEmitEvents(col));
  };
  const [columnMap, setColumnMap] = useState(new Map());
  const addEmitEvents = (column) => {
    column.emitEvents = {
      click: (
        event: MouseEvent,
        row: TableRow,
        rowKey: KeyType,
        rowIndex: number,
        treeLevel: number,
        parent?: TableRow,
      ) => {
        debugger;
        if (column.clickAction) {
          column.clickAction(row, rowKey, rowIndex, treeLevel, parent);
          return;
        }
        cellClick(event, column, row, rowKey);
      },
      dblclick: (
        event: MouseEvent,
        row: TableRow,
        rowKey: KeyType,
        rowIndex: number,
        treeLevel: number,
        parent?: TableRow,
      ) => {
        cellDoubleClick(event, column, row, rowKey);
      },
      check: (value: boolean) => {
        headerSelect(value, allRowKeys);

        // rerenderHeader();
      },
    };
  };
  const createColumn = (
    column: TableColumn & { clickAction?: any; key?: string },
  ): ExtendedColumn => {
    const mappedColumn = columnMap.get(column.field);
    if (mappedColumn) {
      return mappedColumn;
    }

    const sortChange = () => {
      // const sortBy = column.sortBy === 'asc' ? 'desc' : 'asc';
      // props.callbacks.onSortChange(column, sortBy)
      // column.sortBy = sortBy;
      // columns.value = [...columns.value];
    };

    const innerColumn = {
      ...column,
      _colspan: 1,
      _rowspan: 0,
      _keys: column.key as string,
      sortChange,
    } as ExtendedColumn;

    if (innerColumn.getCellData === undefined) {
      innerColumn.getCellData = dataGetter(column.type);
    }
    addEmitEvents(innerColumn);
    setColumnMap(new Map(columnMap.set(column.field, innerColumn)));

    return innerColumn;
  };

  const getColumnsFromFirstRow = (row: TableRow) => {
    return Object.keys(row)
      .filter((key) => key !== rowKeyName)
      .map((key): TableColumn => {
        const type = 'default';
        return createColumn({
          field: key,
          type,
          key,
          align: 'left',
          width: 30,
        });
      });
  };

  const columns = useMemo(() => {
    let _columns = JSON.parse(JSON.stringify(props.columns));
    if (Object.keys(props.columns).length === 0) {
      _columns = getColumnsFromFirstRow(props.data[0]);
      addOperationColumns(_columns);
      return _columns;
    }
    _columns = _columns.map((col) => createColumn(col));
    addOperationColumns(_columns);
    return _columns as ExtendedColumn[];
  }, [props.columns, props.data]);

  return {
    columns,
  };
};

export type UseColumnsReturn = ReturnType<typeof useColumns>;
