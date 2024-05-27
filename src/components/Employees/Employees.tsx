import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import { useStore } from '@app/store';

// import { SearchField } from '@app/ui';
import { Modal } from '../Modal';

/* диалог "добавление сотрудника" */
interface DialogEmployeeAddProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogEmployeeAdd(props: DialogEmployeeAddProps) {
  // const { transportStore } = useStore();
  // const { usersStore } = useStore();
  const { rolesStore } = useStore();

  const [fio, setFio] = React.useState('');
  // const [transportId, setTransportId] = React.useState(-1);
  const [roleId, setRoleId] = React.useState(-1);

  const isFormValid = fio.trim() !== '' && roleId !== -1;

  const handleCancel = () => {
    props.setOpen(false);
    setFio('');
    setRoleId(-1);
    // setTransportId(-1);
  };

  const handleAdd = () => {
    // props.setOpen(false);
    // usersStore.addUser({
    //   id: 0,
    //   username: fio,
    //   role: orgId !== -1 && roleId !== -1 ? rolesStore.getRole(roleId) : undefined,
    // });
    // setFio('');
    // setRoleId(-1);
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Stack height="100vh" direction="column" justifyContent="space-between" margin={5}>
        <Stack spacing={3}>
          <Typography variant="h5">Добавить сотрудника</Typography>

          <Stack spacing={2}>
            <TextField
              required
              variant="standard"
              label="ФИО"
              onChange={(event) => {
                setFio(event.target.value);
              }}
            />

            <FormControl variant="standard">
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                required
                labelId="role-label"
                variant="standard"
                label="Роль"
                value={roleId}
                onChange={(event) => {
                  if (typeof event.target.value === 'number') {
                    setRoleId(event.target.value);
                  }
                }}>
                <MenuItem key={-1} value={-1}>
                  <em>Не назначена</em>
                </MenuItem>
                {rolesStore.roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Выбор транспорта возможен только для роли "Водитель"*/}
            {roleId === 2 ? (
              <FormControl variant="standard">
                <InputLabel id="transport-label">Транспортное средство</InputLabel>
                <Select
                  required
                  labelId="transport-label"
                  variant="standard"
                  onChange={(event) => {
                    if (typeof event.target.value === 'number') {
                      // setOrgId(event.target.value);
                    }
                  }}>
                  <MenuItem key={-1} value={-1}>
                    <em>Не назначен</em>
                  </MenuItem>
                  {/* {orgsStore.orgs.map((org) => (
                              <MenuItem key={org.id} value={org.id}>
                                {org.name}
                              </MenuItem>
                            ))} */}
                </Select>
              </FormControl>
            ) : null}
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCancel();
            }}>
            Отмена
          </Button>

          <Button
            disabled={!isFormValid}
            variant="contained"
            onClick={() => {
              handleAdd();
            }}>
            Добавить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
/* диалог "добавление сотрудника" (конец) */

interface Data {
  id: number;
  name: string;
  role: string;
  transport: string;
  creationDate: string;
}

function createData(
  id: number,
  name: string,
  role: string,
  transport: string,
  creationDate: string,
): Data {
  return {
    id,
    name,
    role,
    transport,
    creationDate,
  };
}

const rows = [
  createData(1, 'Иванов И.И.', 'Водитель', 'MAN, У123УМ152', '2024-04-10'),
  createData(2, 'Петров П.П.', 'Аналитик', '-', '2024-04-09'),
  createData(3, 'Сидоров Ф.В.', 'Водитель', 'Lada, М234РМ152', '2024-04-09'),
  createData(4, 'Семёнов И.И.', 'Водитель', 'Volvo, У193УМ152', '2024-04-10'),
  createData(5, 'Прохин Д.П.', 'Аналитик', '-', '2024-04-09'),
  createData(6, 'Вилков А.В.', 'Водитель', 'BMW, М345РМ152', '2024-04-09'),
  createData(7, 'Трудов С.И.', 'Водитель', 'Daff, У233УМ152', '2024-04-10'),
  createData(9, 'Кантов В.В.', 'Водитель', 'Hundai, М342РМ152', '2024-04-09'),
];

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

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ФИО',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Роль',
  },
  {
    id: 'transport',
    numeric: false,
    disablePadding: false,
    label: 'Транспортное средство',
  },
  {
    id: 'creationDate',
    numeric: false,
    disablePadding: false,
    label: 'Дата создания',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'Bold' }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  // const [findedCount, setFindedCount] = React.useState(-1);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} выбрано
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontSize: '14px' }}
          variant="h6"
          id="tableTitle"
          component="div"></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Удалить">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction="row">
          <Tooltip title="Поиск">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Редактировать">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Toolbar>
  );
}

export function Employees() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const [editEmployeeOpen, setEditEmployeesOpen] = React.useState(false);
  // const [removeEmployeesOpen, setRemoveEmployeesOpen] = React.useState(false);

  const [addEmployeeOpen, setAddEmployeeOpen] = React.useState(false);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
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
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  // setDense(false);

  return (
    <>
      <DialogEmployeeAdd isOpen={addEmployeeOpen} setOpen={setAddEmployeeOpen} />

      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Fab color="primary" onClick={() => setAddEmployeeOpen(true)}>
            <AddIcon />
          </Fab>
          <Typography sx={{ fontSize: '20px' }}>Сотрудник</Typography>
        </Stack>
        <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer sx={{ maxHeight: 'calc( 100vh/2 )' }}>
            <Table
              sx={{ minWidth: 750 }}
              stickyHeader
              aria-labelledby="tableTitle"
              size={'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="left">{row.transport}</TableCell>
                      <TableCell align="left">{row.creationDate}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}>
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
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Уменьшить высоту строки"
      /> */}
      </Stack>
    </>
  );
}
