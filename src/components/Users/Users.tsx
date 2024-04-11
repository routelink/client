import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, Fab, TextField, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface IUserData {
  id: number;
  name: string;
  org: string;
  role: string;
  date: string;
}

interface HeadCell {
  id: keyof IUserData;
  label: string;
}
const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'ФИО' },
  { id: 'org', label: 'Организация' },
  { id: 'role', label: 'Роль' },
  { id: 'date', label: 'Дата создания' },
];

interface TableUsersProps {
  userData: IUserData[];
  onSelectChange: (selectedIndexArray: readonly number[]) => void;
}

function TableUsers(props: TableUsersProps) {
  const rows = props.userData;
  const onSelectChange = props.onSelectChange
    ? props.onSelectChange
    : (_: readonly number[]) => {};

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IUserData>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof IUserData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      onSelectChange(newSelected);
      setSelected(newSelected);
      return;
    }
    onSelectChange([]);
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    onSelectChange(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  const createSortHandler =
    (property: keyof IUserData) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table sx={{ minWidth: 600 }} aria-labelledby="tableTitle" size={'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                <Checkbox
                  sx={{ '&.MuiCheckbox-root': { color: '#4C4C4C' } }}
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ borderWidth: '0px' }}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}>
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {' '}
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}>
                  <TableCell sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                    <Checkbox
                      sx={{ '&.MuiCheckbox-root': { color: '#4C4C4C' } }}
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{ borderWidth: '0px', padding: '12px' }}
                    id={labelId}
                    scope="row"
                    padding="none">
                    {' '}
                    {row.name}{' '}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {' '}
                    {row.org}{' '}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {' '}
                    {row.role}{' '}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px', width: '180px' }}>
                    {' '}
                    {row.date}{' '}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 45 * emptyRows }}>
                {' '}
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

function getUserDataFromBackend(): IUserData[] {
  /* заглушка для получения данных с сервера */
  function createUserData(
    id: number,
    name: string,
    org: string,
    role: string,
    date: string,
  ) {
    return { id, name, org, role, date };
  }

  return [
    createUserData(1, 'Иванов 1', 'ООО Ивановы', 'Администратор', '2020.01.01'),
    createUserData(2, 'Иванов 2', 'ООО Ивановы', 'Аналитик', '2020.02.01'),
    createUserData(3, 'Иванов 3', 'ООО Ивановы', 'Водитель', '2020.03.01'),
    createUserData(4, 'Иванов 4', 'ООО Ивановы', 'Водитель', '2020.03.02'),

    createUserData(5, 'Петров 1', 'ЗАО Петровы', 'Администратор', '2021.02.01'),
    createUserData(6, 'Петров 2', 'ЗАО Петровы', 'Аналитик', '2021.02.02'),
    createUserData(7, 'Петров 3', 'ЗАО Петровы', 'Водитель', '2021.02.03'),
    createUserData(8, 'Петров 4', 'ЗАО Петровы', 'Водитель', '2021.02.04'),

    createUserData(9, 'Сидоров 1', 'НКО Сидоровы', 'Администратор', '2022.03.01'),
    createUserData(10, 'Сидоров 2', 'НКО Сидоровы', 'Аналитик', '2022.03.02'),
    createUserData(11, 'Сидоров 3', 'НКО Сидоровы', 'Аналитик', '2022.03.03'),
    createUserData(12, 'Сидоров 4', 'НКО Сидоровы', 'Водитель', '2022.03.04'),
  ];
}

export function Users() {
  const rawUserData: IUserData[] = getUserDataFromBackend();
  /* ToDo: добавить "живой поиск" (фильтрацию входного массива) */

  const [disableEdit, setDisableEdit] = React.useState(true);
  const [selectedCount, setSelectedCount] = React.useState(0);

  const handleSelectChange = (selectedIndexArray: readonly number[]) => {
    setSelectedCount(selectedIndexArray.length);

    if (selectedIndexArray.length == 0) {
      setDisableEdit(true);
    } else {
      setDisableEdit(false);
    }
  };

  return (
    <>
      <Box>
        {/* кнопка "добавить" */}
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={'18px'}
          marginBottom={'18px'}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              '&&.MuiFab-root ': { bgcolor: '#4C4C4C' },
              '&&.MuiFab-root:hover': { bgcolor: '#6C6C6C' },
            }}>
            <AddIcon />
          </Fab>
          <Typography sx={{ fontSize: '20px' }}>Пользователь</Typography>
        </Box>

        <Paper sx={{ width: '100%' }}>
          {/* панель инструментов */}

          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              bgcolor: 'white',
              '&.MuiToolbar-root': { padding: '5px' },
            }}>
            {/* ToDo: добавить "живой поиск" */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <IconButton>
                <SearchIcon sx={{ color: '#4C4C4C' }} />
              </IconButton>
              <TextField variant="standard" />
            </Box>

            {/* ToDo: добавить редактирование/удаление выделенного */}
            {/* ToDo: вставить куда-то "выделено N записей" */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {selectedCount ? (
                <Typography variant="body2" sx={{ mr: '20px' }}>
                  Выбрано {selectedCount} записей
                </Typography>
              ) : null}

              <Tooltip title="Изменить выбранное" placement="top">
                <span>
                  <IconButton disabled={disableEdit}>
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Удалить выбранное" placement="top">
                <span>
                  <IconButton disabled={disableEdit}>
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Обновить данные" placement="top">
                <span>
                  <IconButton>
                    <SyncIcon /*sx={{color:'#4C4C4C'}}*/ />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Toolbar>

          {/* Таблица пользователей */}
          <TableUsers userData={rawUserData} onSelectChange={handleSelectChange} />
        </Paper>
      </Box>
    </>
  );
}
