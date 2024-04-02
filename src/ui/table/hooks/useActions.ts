import { UseDialogReturn } from './useDialog';
import { UsePropertiesReturn } from '@app/ui/table/hooks/useProperties.ts';
import { UseTableStateReturn } from '@app/ui/table/hooks/useState.ts';
import { Ref } from 'react';
import {
  ColumnType,
  ExtendedColumn,
  KeyType,
  RLTableProps,
  TableRow,
} from '@app/ui/table/types.ts';

type UseActionsProps = {
  dialogRef: UseDialogReturn['dialogRef'];
  keyType: UsePropertiesReturn['keyType'];
  isMultipleChoice: UsePropertiesReturn['isMultipleChoice'];
  rowKeyName: UsePropertiesReturn['rowKeyName'];
  selectedRowKeys: UseTableStateReturn['selectedRowKeys'];
  showDialog: UseDialogReturn['showDialog'];
  setShowDialog: UseDialogReturn['setShowDialog'];
  sortColumn: UseTableStateReturn['sortColumn'];
  tableRef: Ref<any>;
  getActiveRowKey: UseTableStateReturn['getActiveRowKey'];
  setActiveRowKey: UseTableStateReturn['setActiveRowKey'];
  setSelectedRowKeys: UseTableStateReturn['setSelectedRowKeys'];
  setRowEditProps: UseTableStateReturn['setRowEditProps'];
};

export const useActions = (
  props: RLTableProps,
  {
    dialogRef,
    rowKeyName,
    selectedRowKeys,
    setShowDialog,
    isMultipleChoice,
    tableRef,
    setActiveRowKey,
    setSelectedRowKeys,
    setRowEditProps,
  }: UseActionsProps,
) => {
  //#region state

  const _sort: Sort | undefined = undefined;
  // const dialogs = useDialogs();

  const clearEditState = () => {
    setRowEditProps(null);
  };

  /** Открывает диалог редактирования строки */
  const openDialog = () => {
    setShowDialog(true);
    dialogRef.value?.open();
  };

  /**  Очищает данные в хранилище*/
  const editEnd = () => {
    clearEditState();
  };

  /** Вызывается при активизации строки */
  const activateRow = (row: TableRow, rowKey: KeyType) => {
    if (row) {
      onActivateRow(row, rowKey);
    }
    setActiveRowKey(rowKey);
  };

  /** Вызов команды "добавить строку" (ДоступныеДействия.Добавление),
   *  открывает диалог редактирования новой строки */
  const addRow = () => {
    let predifinedRowData: TableRow | undefined;

    const newRow: TableRow = {
      ...predifinedRowData,
    };

    const action = props.availableActions?.add;
    setRowEditProps({
      isAdd: true,
      title:
        (action && typeof action !== 'boolean' && action.windowTitle) ||
        'Добавить',
      saveLabel:
        (action && typeof action !== 'boolean' && action.actionTitle) ||
        'Добавить',
      row: newRow,
      rowKey: '',
    });
    openDialog();
  };

  /** Клик на ячейку */
  const cellClick = (
    event: MouseEvent,
    column: ColumnType,
    row: TableRow,
    rowKey: KeyType,
    rowIndex: number,
  ) => {
    selection(row, rowKey);
    activateRow(row, rowKey);
  };
  const cellDoubleClick = (
    event: MouseEvent,
    column: ExtendedColumn,
    row: TableRow,
    rowKey: KeyType,
    rowIndex: number,
    treeLevel: number,
    parent?: TableRow,
  ) => {};

  const headerSelect = (value: boolean, rows: KeyType[]) => {
    if (tableRef) {
      selectAll(value, rows);
    }
  };

  /** Вызов команды "изменить строку" (ДоступныеДействия.Редактирование),
   *  открывает диалог редактирования текущей строки */
  const editRow = (row: TableRow, rowKey: KeyType) => {
    debugger;
    const action = props.availableActions?.edit;
    setRowEditProps({
      isAdd: false,
      title:
        (action && typeof action !== 'boolean' && action.windowTitle) ||
        'Сохранить',
      saveLabel:
        (action && typeof action !== 'boolean' && action.actionTitle) ||
        'Сохранить',
      row,
      rowKey,
    });
    openDialog();
  };

  /** Открывает диалоговое окно подтверждения удаления */
  const openRowDeleteConfirm = (): Promise<boolean> | boolean => {
    // const pendingModal = dialogs.open<boolean>(
    //   {},
    //   h(DeleteConfirmation, {
    //     title: 'Введенные данные будут утеряны'
    //   })
    // );
    // if (pendingModal) {
    //   return pendingModal.then((res) => {
    //     return res;
    //   });
    // } else {
    //   return false;
    // }
  };

  /** Вызов команды "удалить строку" (ДоступныеДействия.Удаление) */
  const removeRow = async (row: TableRow, rowKey: KeyType) => {
    // const confirmFlag =
    //   typeof props.item.ДоступныеДействия?.Удаление === 'object' &&
    //   props.item.ДоступныеДействия?.Удаление?.ПодтверждениеПриУдаленииСтроки;
    // if (confirmFlag) {
    //   if (!(await openRowDeleteConfirm())) {
    //     return;
    //   }
    // }
    let newModel;

    const _rowIndex = props.data.findIndex((el) => el === row);
    newModel = [
      ...props.data.slice(0, _rowIndex),
      ...props.data.slice(_rowIndex + 1),
    ];
    props.callbacks.onDataChange(newModel);
    onRowDelete(row, rowKey);
  };

  /** Вызов команды "сохранить строку"
   *  сохраняет данные строки из диалога редактирования в store */
  const saveRow = (row: TableRow, isAdd: boolean) => {
    if (isAdd && !row[rowKeyName]) {
      row[rowKeyName] = Math.random().toString();
    }
    const _rowKey = row[rowKeyName] as KeyType;

    let newModel: TableRow[];
    if (isAdd) {
      newModel = [...props.data, row];
    } else {
      const rowIndex = props.data.findIndex(
        (el) => el[rowKeyName] === row[rowKeyName],
      );
      newModel = [
        ...props.data.slice(0, rowIndex),
        row,
        ...props.data.slice(rowIndex + 1),
      ];
    }
    props.callbacks.onDataChange(newModel);

    if (!isAdd) {
      onRowChange(row, _rowKey);
    } else {
      onRowAdd(row, _rowKey);
    }

    // dialogRef?.close();
    clearEditState();
  };

  /** Вызов команды "сортировать" */
  const sort = (column: TableColumn, sortBy: TableColumn['sortBy']) => {
    // if (!_sort) _sort = { Значение: '', РеквизитИерархии: '' };
    //
    // _sort.Значение = `${column.key} ${sortBy === 'asc' ? 'ВОЗР' : 'УБЫВ'}`;
    // sortColumn.value = { key: column.key, sortBy: sortBy };
    // onSortChange();
  };

  /** Вызов команды "выбор", вызывается при двойном щелчке мыши или нажатии Enter */
  const selection = (row: TableRow, rowKey: KeyType) => {
    //
  };

  /** Вызов команды "выбрать строку" */
  const selectRow = (
    row: TableRow,
    rowKey: KeyType,
    rowIndex: number | undefined,
    treeLevel: number,
  ) => {
    if (isMultipleChoice) {
      if (selectedRowKeys.includes(rowKey)) {
        setSelectedRowKeys(selectedRowKeys.filter((key) => key !== rowKey));
      } else {
        setSelectedRowKeys([...selectedRowKeys, rowKey]);
      }
    } else {
      if (selectedRowKeys.includes(rowKey)) {
        setSelectedRowKeys([]);
      } else {
        setSelectedRowKeys([rowKey]);
      }
    }
    // onSelectRow(row, rowKey);
  };

  const selectAll = (value: boolean, rows: KeyType[]) => {
    if (value) {
      setSelectedRowKeys(rows);
    } else {
      setSelectedRowKeys([]);
    }
  };

  /** Вызывается при активизации строки */
  const onActivateRow = (row: TableRow, rowKey: KeyType) => {
    //deprecated: использовать событие ПриАктивизацииСтроки
    //   if (
    //     props.item.Действие?.ПараметрыДействия?.Действие === 'ДействиеПриАктивацииСтроки'
    //   ) {
    //     tableAction(props.item.Действие, row, rowKey);
    //   }
    //   //deprecated: использовать событие ПриАктивизацииСтроки
    //   if (props.item.ДействиеТочкиВыбора) {
    //     tableAction(props.item.ДействиеТочкиВыбора, row, rowKey);
    //   }
    //   if (props.item.ПриАктивизацииСтроки) {
    //     tableAction(props.item.ПриАктивизацииСтроки, row, rowKey);
    //   }
    // };
    //
    // const onSelectRow = (row?: TableRow, rowKey?: KeyType) => {
    //   //deprecated: использовать событие ПриВыбореСтроки
    //   if (props.item.ДействиеЧекбоксаВыбора) {
    //     tableAction(props.item.ДействиеЧекбоксаВыбора, row, rowKey);
    //   }
    //   if (props.item.ПриВыбореСтроки) {
    //     tableAction(props.item.ПриВыбореСтроки, row, rowKey);
    //   }
  };

  /** Вызывается после добавления строки в таблицу */
  const onRowAdd = (row: TableRow, rowKey: KeyType) => {
    props.callbacks.onRowAdd && props.callbacks.onRowAdd(row, rowKey);
  };

  /** Вызывается после изменения строки таблицы */
  const onRowChange = (row: TableRow, rowKey: KeyType) => {
    props.callbacks.onRowChange && props.callbacks.onRowChange(row, rowKey);
  };

  /** Вызывается после удаления строки таблицы */
  const onRowDelete = (row: TableRow, rowKey: KeyType) => {
    props.callbacks.onRowDelete && props.callbacks.onRowDelete(row, rowKey);

    //deprecated: использовать событие ПриУдаленииСтроки
  };

  /** Вызывается при изменении сортировки таблицы */
  // const onSortChange = () => {
  //   if (props.item.ОбработкаСортировки) {
  //     const action = props.item.ОбработкаСортировки;
  //     tableAction({
  //       ...action,
  //       ПараметрыДействия: mergeDeep(action.ПараметрыДействия, { sort: _sort })
  //     });
  //   } else {
  //     eventHub.$emit(`change-list-options-${formId}`, { page: 1, sort: _sort });
  //   }
  // };

  return {
    //команды
    //обработка команд
    activateRow,
    addRow,
    cellClick,
    cellDoubleClick,
    editRow,
    headerSelect,
    removeRow,
    saveRow,
    selection,
    selectRow,
    sort,
    editEnd,
    openDialog,
  };
};

export type UseActionsReturn = ReturnType<typeof useActions>;
