import { observer } from 'mobx-react'; 
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

interface RowData{
  id: number;
  machineDowntime: number;
  date: Date;
}

const initialRows: RowData[] = [ 
  { id: 1, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 2, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 3, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 4, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 5, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 6, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 7, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 8, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 9, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 10, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 11, machineDowntime: 9, date: new Date(2024, 3, 12) },
  { id: 12, machineDowntime: 9, date: new Date(2024, 3, 12) },
];




  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50, description: 'Транспорт ID.' },
    { field: 'machineDowntime', headerName: 'Простой', width: 100, minWidth: 100, type: 'number' },
    { field: 'date', headerName: 'Дата', type: 'date', width: 100 },
  ];



const AutoEfficiencyTable: React.FC = observer(() => {
  const [rows, /*setRows*/] = React.useState<RowData[]>(initialRows);
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        autoHeight
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
})



export default AutoEfficiencyTable;