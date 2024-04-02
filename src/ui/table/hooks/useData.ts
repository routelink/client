import { useMemo, useState } from 'react';
import { TableRow, KeyType, RLTableProps } from '@app/ui/table/types.ts';

export const useData = (props: RLTableProps) => {
  const [allRowKeys, setAllRowKeys] = useState<KeyType[]>([]);
  const refreshAllRowKeys = (rows: TableRow[]) => {
    setAllRowKeys(rows.map((row) => row[props.rowKeyName] as KeyType));
  };
  const data = useMemo(() => {
    const { data: _data } = props;

    refreshAllRowKeys(_data);
    return {
      rows: _data,
      totalRow: _data.length,
      // rowKey: rowKey,
    };
  }, [props.data]);

  return { data, allRowKeys };
};
export type UseDataReturn = ReturnType<typeof useData>;
