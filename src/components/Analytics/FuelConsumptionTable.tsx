import { observer } from 'mobx-react';
import React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', description: 'Транспорт ID.' },
  {
    field: 'avgConsumption',
    headerName: 'Ср расход топлива',
    type: 'number',
  },
  {
    field: 'pathTraveled',
    headerName: 'Пройденный путь за день',
    type: 'number',
  },
  {
    field: 'requiredFuel',
    headerName: 'Топлива понадобилось',
    type: 'number',
  },

  { field: 'date', headerName: 'Дата', type: 'date' },
];

interface RowData {
  id: number;
  avgConsumption: number;
  pathTraveled: number;
  requiredFuel: number;
  date: Date;
}

const initialRows: RowData[] = [
  {
    id: 1,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 2,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 3,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 4,
    avgConsumption: 9,
    pathTraveled: 140,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 5,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 6,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 7,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 8,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 9,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 10,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 11,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
  {
    id: 12,
    avgConsumption: 9,
    pathTraveled: 150,
    requiredFuel: 14,
    date: new Date(2024, 3, 12),
  },
];

const FuelConsumptionTable: React.FC = observer(() => {
  const [rows /*setRows*/] = React.useState<RowData[]>(initialRows);
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
});

export default FuelConsumptionTable;
