import React, { useCallback, useMemo } from 'react';
import {
  ColDef,
  FirstDataRenderedEvent,
  IRowNode,
  ModuleRegistry,
} from '@ag-grid-community/core';

import { AgGridReact } from 'ag-grid-react';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type TableProps<T, B> = {
  rowData: T;
  columns: B;
};

const TransportTable = <T extends [], B extends ColDef>({
  rowData,
  columns,
}: TableProps<T, B>): React.ReactElement => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '900px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent<T>) => {
    const nodesToSelect: IRowNode[] = [];
    params.api.forEachNode((node: IRowNode) => {
      if (node.data && node.data.year === 2012) {
        nodesToSelect.push(node);
      }
    });
    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  }, []);
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={'ag-theme-material'}>
        {/* @ts-expect-error: Олег, помоги плиз разобраться с конфликтом типов */}
        <AgGridReact<T>
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};
export default TransportTable;
