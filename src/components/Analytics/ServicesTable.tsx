import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120, description: 'Транспорт ID.' },
  { field: 'type', headerName: 'Тип', width: 130 },
  {
    field: 'date',
    headerName: 'Дата',
    description: 'Дата последнего ТО.',
    type: 'date',
    width: 100,
  },
  {
    field: 'length',
    headerName: 'Пробег',
    width: 120,
    description: 'Пробег с последнего ТО.',
    type: 'number',
  },
];

const rows = [
  { id: 1, type: 'Мотоцикл', date: new Date(2024, 3, 12), length: 999999 },
  { id: 2, type: 'Мотоцикл', date: new Date(2024, 5, 12), length: 123441 },
  { id: 3, type: 'Мотоцикл', date: new Date(2024, 5, 12), length: 12441 },
  { id: 4, type: 'Мотоцикл', date: new Date(2024, 5, 12), length: 123441 },
  { id: 5, type: 'Грузовик', date: new Date(2024, 5, 12), length: 12341 },
  { id: 6, type: 'Грузовик', date: new Date(2024, 5, 12), length: 13441 },
  { id: 7, type: 'Грузовик', date: new Date(2024, 5, 12), length: 12341 },
  { id: 8, type: 'Грузовик', date: new Date(2024, 5, 12), length: 23441 },
  { id: 9, type: 'Электрокар', date: new Date(2024, 5, 12), length: 13441 },
  { id: 10, type: 'Электрокар', date: new Date(2024, 5, 12), length: 12341 },
  { id: 11, type: 'Электрокар', date: new Date(2024, 5, 12), length: 13441 },
  { id: 12, type: 'Электрокар', date: new Date(2024, 5, 12), length: 12344 },
];

export default function ServicesTable() {
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
}
