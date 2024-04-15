import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120, description: 'Транспорт ID.'},
  { field: 'trafficAccidentSum', headerName: 'Количество ДТП', width: 130, type: 'number' },
];

const rows = [
  { id: 1, trafficAccidentSum: 9},
  { id: 2, trafficAccidentSum: 9},
  { id: 3, trafficAccidentSum: 9},
  { id: 4, trafficAccidentSum: 9},
  { id: 5, trafficAccidentSum: 9},
  { id: 6, trafficAccidentSum: 9},
  { id: 7, trafficAccidentSum: 9},
  { id: 8, trafficAccidentSum: 9},
  { id: 9, trafficAccidentSum: 9},
  { id: 10, trafficAccidentSum: 9},
  { id: 11, trafficAccidentSum: 9},
  { id: 12, trafficAccidentSum: 9}
];

export default function TrafficAccidentTable() {
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