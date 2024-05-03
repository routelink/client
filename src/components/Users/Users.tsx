import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import { IUser } from '@app/models';
import { useStore } from '@app/store';
import { SearchField } from '@app/ui';

import { Modal } from '../Modal';

function DateToString(date: Date): String {
  return (
    date.getFullYear() +
    '.' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(date.getDate()).padStart(2, '0')
  );
}

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
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date },
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

interface IUserTableView {
  id: number;
  name: string;
  orgId: number;
  orgName: string;
  roleId: number;
  roleName: string;
  createdAt: Date;
}

interface HeadCell {
  id: keyof IUserTableView;
  label: string;
}
const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'ФИО' },
  { id: 'orgName', label: 'Организация' },
  { id: 'roleName', label: 'Роль' },
  { id: 'createdAt', label: 'Дата создания' },
];

interface TableUsersProps {
  userData: IUserTableView[];
  onSelectChange: (selectedIndexArray: readonly number[]) => void;
}

function TableUsers(props: TableUsersProps) {
  const rows = props.userData;
  const onSelectChange = props.onSelectChange
    ? props.onSelectChange
    : (_: readonly number[]) => {};

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IUserTableView>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IUserTableView,
  ) => {
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
    (property: keyof IUserTableView) => (event: React.MouseEvent<unknown>) => {
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
          size="medium">
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
                    {row.orgName}{' '}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {' '}
                    {row.roleName}{' '}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px', width: '180px' }}>
                    {' '}
                    {DateToString(row.createdAt)}{' '}
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
        rowsPerPageOptions={[5, 10, 25, 100]}
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
  const [email, setEmail] = React.useState('');

  const isFormValid = fio.trim() !== '' && email.trim() !== '';

  const handleCancel = () => {
    props.setOpen(false);
    setFio('');
    setEmail('');
  };

  const handleAdd = () => {
    props.setOpen(false);
    setFio('');
    setEmail('');
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Stack height="100vh" direction="column" justifyContent="space-between" margin={5}>
        <Stack spacing={3}>
          <Typography variant="h5">Добавить пользователя</Typography>

          <Stack spacing={2}>
            <TextField
              required
              variant="standard"
              label="ФИО"
              onChange={(event) => {
                setFio(event.target.value);
              }}
            />

            <TextField
              required
              variant="standard"
              label="E-mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
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
/* панель "добавление пользователя" (конец) */

/* панель "изменение пользователя" */
interface PanelUserEditProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PanelUserEdit(props: PanelUserEditProps) {
  const [fio, setFio] = React.useState('Иванов И.И.');
  const [email, setEmail] = React.useState('ii_ivanoff@yandex.ru');
  const [org, setOrg] = React.useState('ООО Ивановы');
  const [role, setRole] = React.useState('Аналитик');

  const isFormValid =
    fio.trim() !== '' && email.trim() !== '' && org.trim() !== '' && role.trim() !== '';

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleAdd = () => {
    props.setOpen(false);
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Stack height="100vh" direction="column" justifyContent="space-between" margin={5}>
        <Stack spacing={3}>
          <Typography variant="h5">Изменение пользователя</Typography>

          <Stack spacing={2}>
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
                variant="standard"
                value={org}
                onChange={(event) => {
                  setOrg(event.target.value);
                }}>
                <MenuItem value="ООО Ивановы"> ООО Ивановы </MenuItem>
                <MenuItem value="ЗАО Петровы"> ЗАО Петровы </MenuItem>
                <MenuItem value="НКО Сидоровы"> НКО Сидоровы </MenuItem>
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
                <MenuItem value="Администратор"> Администратор </MenuItem>
                <MenuItem value="Аналитик"> Аналитик </MenuItem>
                <MenuItem value="Водитель"> Водитель </MenuItem>
              </Select>
            </FormControl>
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
            Изменить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
/* панель "изменение пользователя" (конец) */

/* диалог "удаления пользователя" */
interface DialogRemoveUsersProps {
  isOpen: boolean;
  usersIds: number[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogRemoveUsers(props: DialogRemoveUsersProps) {
  const { usersStore } = useStore();
  const handleCancel = () => {
    props.setOpen(false);
  };
  const handleRemove = () => {
    usersStore.removeUsers(props.usersIds);
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

function IUsers2IUserTableView(users: IUser[]): IUserTableView[] {
  return users.map((user: IUser): IUserTableView => {
    const userAsTabView: IUserTableView = {
      id: user.id,
      name: user.username,
      orgId: user.organization ? user.organization.id : -1,
      orgName: user.organization ? user.organization.name : '',
      roleId: user.role ? user.role.id : -1,
      roleName: user.role ? user.role.name : '',
      createdAt: user.createdAt ? user.createdAt : new Date(0, 0, 0),
    };

    return userAsTabView;
  });
}

export function Users() {
  const { usersStore } = useStore();
  const [showUserData, setShowUserData] = React.useState<IUserTableView[]>(
    IUsers2IUserTableView(usersStore.users),
  );

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [findedCount, setFindedCount] = React.useState(-1);

  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [removeUsersOpen, setRemoveUsersOpen] = React.useState(false);

  React.useEffect(() => {
    setShowUserData(IUsers2IUserTableView(usersStore.users));
  }, [usersStore.users]);

  const handleSearchChange = (search: string) => {
    const newUserData: IUserTableView[] = IUsers2IUserTableView(usersStore.users).filter(
      (userData) =>
        userData.name.toLowerCase().includes(search.toLowerCase()) ||
        userData.orgName.toLowerCase().includes(search.toLowerCase()) ||
        userData.roleName.toLowerCase().includes(search.toLowerCase()) ||
        DateToString(userData.createdAt).includes(search.toLowerCase()),
    );
    if (search.length) {
      setFindedCount(newUserData.length);
    } else {
      setFindedCount(-1);
    }
    setShowUserData(newUserData);
  };

  const handleSelectChange = (selectedIndexArray: readonly number[]) => {
    setSelectedIds(selectedIndexArray.slice());
  };

  return (
    <>
      {/* панель "добавление пользователя" */}
      <PanelUserAdd isOpen={addUserOpen} setOpen={setAddUserOpen} />

      {/* панель "изменение пользователя" */}
      <PanelUserEdit isOpen={editUserOpen} setOpen={setEditUserOpen} />

      {/* диалог "удаление пользователя" */}
      <DialogRemoveUsers
        isOpen={removeUsersOpen}
        usersIds={selectedIds}
        setOpen={setRemoveUsersOpen}
      />

      <Stack direction="column" spacing={2}>
        {/* вызов панели "добавление пользователя" */}

        <Stack direction="row" alignItems="center" spacing={2}>
          <Fab
            color="primary"
            onClick={() => {
              setAddUserOpen(true);
            }}>
            <AddIcon />
          </Fab>
          <Typography variant="h6">Пользователь</Typography>
        </Stack>

        <Paper sx={{ width: '100%' }}>
          {/* панель инструментов */}

          <Stack direction="row" justifyContent="space-between" sx={{ ml: 1 }}>
            {/* панель поиска */}
            <SearchField
              onInput={(val: string) => handleSearchChange(val)}
              count={findedCount}></SearchField>

            {/* панель редактирования */}
            <Stack direction="row" alignItems="flex-end">
              {selectedIds.length ? (
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {' '}
                  Выбрано {selectedIds.length} записей{' '}
                </Typography>
              ) : null}

              <Tooltip title="Изменить выбранное" placement="top">
                <span>
                  <IconButton
                    disabled={selectedIds.length !== 1}
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
                    disabled={selectedIds.length === 0}
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
            </Stack>
          </Stack>
          {/* таблица пользователей */}
          <TableUsers userData={showUserData} onSelectChange={handleSelectChange} />
        </Paper>
      </Stack>
    </>
  );
}
