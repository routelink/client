import { RLTableProps, RowEditProps, SortColumn } from '@app/ui/table/types.ts';
import { useState } from 'react';

export const useTableState = (props: RLTableProps) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    key: '',
    sortBy: '',
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<KeyType[]>([]);

  const [activeRowKey, setActiveRowKey] = useState<KeyType>();

  const getActiveRowKey = () => {
    return activeRowKey;
  };
  const [rowEditProps, setRowEditProps] = useState<Omit<
    RowEditProps,
    'columns' | 'changeRowOrder'
  > | null>(null);

  return {
    sortColumn,
    setSortColumn,
    selectedRowKeys,
    setSelectedRowKeys,
    activeRowKey,
    setActiveRowKey,
    getActiveRowKey,
    rowEditProps,
    setRowEditProps,
  };
};
export type UseTableStateReturn = ReturnType<typeof useTableState>;
