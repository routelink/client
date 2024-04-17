import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120, description: 'Транспорт ID.' },
  {
    field: 'avgConsumption',
    headerName: 'Ср расход топлива',
    width: 150,
    type: 'number',
  },
  {
    field: 'pathTraveled',
    headerName: 'Пройденный путь за день',
    width: 200,
    type: 'number',
  },
  {
    field: 'requiredFuel',
    headerName: 'Топлива понадобилось',
    width: 170,
    type: 'number',
  },
  { field: 'date', headerName: 'Дата', width: 130, type: 'date' },
];

const rows = [
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

export default function FuelConsumptionTable() {
  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
}
