import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react'; 
import React from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120, description: 'Транспорт ID.' },
  { field: 'machineOvertime', headerName: 'Время работы', width: 130, type: 'number' },
  {
    field: 'date',
    headerName: 'Дата',
    type: 'date',
    width: 100,
  },
];

interface RowData{
  id: number;
  machineOvertime: number;
  date: Date;
}

const initialRows: RowData[] = [
  { id: 1, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 2, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 3, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 4, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 5, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 6, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 7, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 8, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 9, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 10, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 11, machineOvertime: 9, date: new Date(2024, 3, 12) },
  { id: 12, machineOvertime: 9, date: new Date(2024, 3, 12) },
];

const OvertimeTable: React.FC = observer(() => {
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

const [rows, setRows] = React.useState<RowData[]>(initialRows);

export default OvertimeTable;