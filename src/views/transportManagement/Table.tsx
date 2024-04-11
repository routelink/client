import React, { useCallback, useMemo, useState } from 'react';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IRowNode,
  ModuleRegistry,
} from '@ag-grid-community/core';
import { DateRenderer } from '@app/ui';
import { generateRows } from '@app/utils';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
const TransportManagementTable: React.FC<TableProps> = ({ rowData, columnDefs }) => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '900px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {}, []);

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
      <div style={gridStyle} className={'ag-theme-quartz'}>
        <AgGridReact<T>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};
export default TransportManagementTable;
