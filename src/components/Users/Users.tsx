import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, Fab, TextField, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
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

import { Modal } from '../Modal';

{
  /* таблица пользователей */
}
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
  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const createSortHandler =
    (property: keyof IUserData) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <Box>
      <TableContainer
        sx={{
          maxHeight: 'calc( 100vh - 296px )',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c5c5c5',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
        }}>
        <Table
          stickyHeader
          sx={{ minWidth: 600 }}
          aria-labelledby="tableTitle"
          size={'medium'}>
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
              <TableRow style={{ height: 44.02 * emptyRows }}>
                <TableCell colSpan={6} sx={{ borderWidth: '0px' }} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
/* таблица пользователей (конец) */

/* панель "добавление пользователя" */
interface PanelUserAddProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PanelUserAdd(props: PanelUserAddProps) {
  const [fio, setFio] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');

  const isFormValid = fio.trim() !== '' && login.trim() !== '' && email.trim() !== '';

  const handleCancel = () => {
    props.setOpen(false);
    setFio('');
    setLogin('');
    setEmail('');
  };

  const handleAdd = () => {
    props.setOpen(false);
    setFio('');
    setLogin('');
    setEmail('');
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        height={'100vh'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'stretch'}
          maxWidth={'500px'}
          margin={'50px'}>
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            Добавить пользователя
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>
            <TextField
              variant="standard"
              label="ФИО"
              onChange={(event) => {
                setFio(event.target.value);
              }}
            />
            <Typography sx={{ fontSize: '12px', mt: '5px' }}>
              Обязательное поле
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>
            <TextField
              variant="standard"
              label="Логин"
              onChange={(event) => {
                setLogin(event.target.value);
              }}
            />
            <Typography sx={{ fontSize: '12px', mt: '5px' }}>
              Обязательное поле
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>
            <TextField
              variant="standard"
              label="E-mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Typography sx={{ fontSize: '12px', mt: '5px' }}>
              Обязательное поле
            </Typography>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            mt={'30px'}
            gap={'30px'}>
            <Button
              variant="outlined"
              onClick={() => {
                handleCancel();
              }}
              sx={{ width: '140px' }}>
              Отмена
            </Button>

            <Button
              disabled={!isFormValid}
              variant="contained"
              onClick={() => {
                handleAdd();
              }}
              sx={{ width: '140px' }}>
              Добавить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
/* панель "добавление пользователя" (конец) */

/* панель "изменение пользователя" */
interface PanelUserEditProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PanelUserEdit(props: PanelUserEditProps) {
  const [fio, setFio] = React.useState('Иванов И.И.');
  const [login, setLogin] = React.useState('ii_ivanoff');
  const [email, setEmail] = React.useState('ii_ivanoff@yandex.ru');
  const [org, setOrg] = React.useState('ООО Ивановы');
  const [role, setRole] = React.useState('Аналитик');

  const isFormValid =
    fio.trim() !== '' &&
    login.trim() !== '' &&
    email.trim() !== '' &&
    org.trim() !== '' &&
    role.trim() !== '';

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleAdd = () => {
    props.setOpen(false);
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        height={'100vh'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'}
          alignItems={'stretch'}
          maxWidth={'500px'}
          margin={'50px'}>
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            Изменение пользователя
          </Typography>

          <TextField
            variant="standard"
            label="ФИО"
            defaultValue={fio}
            onChange={(event) => {
              setFio(event.target.value);
            }}
          />

          <TextField
            variant="standard"
            label="Логин"
            defaultValue={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />

          <TextField
            variant="standard"
            label="E-mail"
            defaultValue={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <FormControl variant="standard">
            <InputLabel id="org-label">Организация</InputLabel>
            <Select
              labelId="org-label"
              value={org}
              onChange={(event) => {
                setOrg(event.target.value);
              }}>
              <MenuItem value={'ООО Ивановы'}>ООО Ивановы</MenuItem>
              <MenuItem value={'ЗАО Петровы'}>ЗАО Петровы</MenuItem>
              <MenuItem value={'НКО Сидоровы'}>НКО Сидоровы</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="role-label">Роль</InputLabel>
            <Select
              variant="standard"
              labelId="role-label"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}>
              <MenuItem value={'Администратор'}>Администратор</MenuItem>
              <MenuItem value={'Аналитик'}>Аналитик</MenuItem>
              <MenuItem value={'Водитель'}>Водитель</MenuItem>
            </Select>
          </FormControl>

          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            mt={'30px'}
            gap={'30px'}>
            <Button
              variant="outlined"
              onClick={() => {
                handleCancel();
              }}
              sx={{ width: '140px' }}>
              Отмена
            </Button>

            <Button
              disabled={!isFormValid}
              variant="contained"
              onClick={() => {
                handleAdd();
              }}
              sx={{ width: '140px' }}>
              Изменить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
/* панель "изменение пользователя" (конец) */

/* диалог "удаления пользователя" */
interface DialogRemoveUsersProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogRemoveUsers(props: DialogRemoveUsersProps) {
  const handleCancel = () => {
    props.setOpen(false);
  };
  const handleRemove = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>Удалить выбранных пользователей?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Отмена
          </Button>
          <Button onClick={handleRemove} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
/* диалог "удаления пользователя" (конец) */

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
  const [showUserData, setShowUserData] = React.useState<IUserData[]>(rawUserData);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [findedCount, setFindedCount] = React.useState(-1);

  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [removeUsersOpen, setRemoveUsersOpen] = React.useState(false);

  const handleSearchChange = (search: string) => {
    const newUserData: IUserData[] = rawUserData.filter(
      (userData) =>
        userData.name.toLowerCase().includes(search.toLowerCase()) ||
        userData.org.toLowerCase().includes(search.toLowerCase()) ||
        userData.role.toLowerCase().includes(search.toLowerCase()) ||
        userData.date.toLowerCase().includes(search.toLowerCase()),
    );
    if (search.length) {
      setFindedCount(newUserData.length);
    } else {
      setFindedCount(-1);
    }
    setShowUserData(newUserData);
  };

  const handleSelectChange = (selectedIndexArray: readonly number[]) => {
    setSelectedCount(selectedIndexArray.length);
  };

  return (
    <>
      {/* панель "добавление пользователя" */}
      <PanelUserAdd isOpen={addUserOpen} setOpen={setAddUserOpen} />

      {/* панель "изменение пользователя" */}
      <PanelUserEdit isOpen={editUserOpen} setOpen={setEditUserOpen} />

      {/* диалог "удаление пользователя" */}
      <DialogRemoveUsers isOpen={removeUsersOpen} setOpen={setRemoveUsersOpen} />

      <Box margin={'0px 20px 0px 20px'}>
        {/* вызов панели "добавление пользователя" */}
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'18px'}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ margin: '20px 0px 20px 0px' }}
            onClick={() => {
              setAddUserOpen(true);
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
            {/* панель поиска */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                alignItems: 'center',
              }}>
              <SearchIcon sx={{ ml: '5px' }} />
              <TextField
                variant="standard"
                label="Поиск"
                onChange={(event) => {
                  handleSearchChange(event.target.value.trim());
                }}
              />
              {findedCount >= 0 ? (
                <Typography variant="body2" sx={{ mr: '20px' }}>
                  Найдено {findedCount} записей
                </Typography>
              ) : null}
            </Box>

            {/* панель редактирования */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {selectedCount ? (
                <Typography variant="body2" sx={{ mr: '20px' }}>
                  Выбрано {selectedCount} записей
                </Typography>
              ) : null}

              <Tooltip title="Изменить выбранное" placement="top">
                <span>
                  <IconButton
                    disabled={selectedCount !== 1}
                    onClick={() => {
                      setEditUserOpen(true);
                    }}>
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Удалить выбранное" placement="top">
                <span>
                  <IconButton
                    disabled={selectedCount === 0}
                    onClick={() => {
                      setRemoveUsersOpen(true);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Обновить данные" placement="top">
                <span>
                  <IconButton>
                    <SyncIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Toolbar>

          {/* таблица пользователей */}
          <TableUsers userData={showUserData} onSelectChange={handleSelectChange} />
        </Paper>
      </Box>
    </>
  );
}
