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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
  email: string;
  orgName: string;
  roleName: string;
  createdAt: Date;
}

interface HeadCell {
  id: keyof IUserTableView;
  label: string;
}
const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'ФИО' },
  { id: 'email', label: 'Эл. почта' },
  { id: 'orgName', label: 'Организация' },
  { id: 'roleName', label: 'Роль' },
  { id: 'createdAt', label: 'Дата создания' },
];

interface TableUsersProps {
  userData: IUser[];
  onSelectChange: (selectedIndexArray: readonly number[]) => void;
}

function TableUsers(props: TableUsersProps) {
  const rows = props.userData.map((user: IUser): IUserTableView => {
    return {
      id: user.id,
      name: user.username,
      email: user.email,
      orgName: user.organization?.name || '',
      roleName: user.role?.name || '',
      createdAt: user.createdAt || new Date(0, 0, 0),
    };
  });

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
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{ borderWidth: '0px', padding: '12px' }}
                    id={labelId}
                    scope="row"
                    padding="none">
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {row.orgName}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                    {row.roleName}
                  </TableCell>
                  <TableCell sx={{ borderWidth: '0px', padding: '12px', width: '180px' }}>
                    {DateToString(row.createdAt)}
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

/* диалог "добавление пользователя" */
interface DialogUserAddProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogUserAdd(props: DialogUserAddProps) {
  const { orgsStore } = useStore();
  const { usersStore } = useStore();
  const { rolesStore } = useStore();

  const [fio, setFio] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [orgId, setOrgId] = React.useState(-1);
  const [roleId, setRoleId] = React.useState(-1);

  const isFormValid = fio.trim() !== '' && email.trim() !== '';

  const handleCancel = () => {
    props.setOpen(false);
    setFio('');
    setEmail('');
    setRoleId(-1);
    setOrgId(-1);
  };

  const handleAdd = () => {
    props.setOpen(false);

    usersStore.addUser({
      id: 0,
      username: fio,
      email: email,
      organization: orgId !== -1 ? orgsStore.getOrg(orgId) : undefined,
      role: orgId !== -1 && roleId !== -1 ? rolesStore.getRole(roleId) : undefined,
    });

    setFio('');
    setEmail('');
    setRoleId(-1);
    setOrgId(-1);
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

            <FormControl variant="standard">
              <InputLabel id="org-label">Организация</InputLabel>
              <Select
                labelId="org-label"
                variant="standard"
                value={orgId}
                onChange={(event) => {
                  if (typeof event.target.value === 'number') {
                    setOrgId(event.target.value);
                  }
                }}>
                <MenuItem key={-1} value={-1}>
                  <em>Не назначена</em>
                </MenuItem>
                {orgsStore.orgs.map((org) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {orgId !== -1 ? (
              <FormControl variant="standard">
                <InputLabel id="role-label">Роль</InputLabel>
                <Select
                  labelId="role-label"
                  variant="standard"
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
/* диалог "добавление пользователя" (конец) */

/* диалог "изменение пользователя" */
interface DialogUserEditProps {
  isOpen: boolean;
  userId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogUserEdit(props: DialogUserEditProps) {
  const { orgsStore } = useStore();
  const { usersStore } = useStore();
  const { rolesStore } = useStore();

  const selectedUser = usersStore.getUser(props.userId);
  if (!selectedUser) {
    props.setOpen(false);
    return <></>;
  }

  const [fio, setFio] = React.useState(selectedUser.username);
  const [email, setEmail] = React.useState(selectedUser.email);
  const [orgId, setOrgId] = React.useState(
    selectedUser.organization ? selectedUser.organization.id : -1,
  );
  const [roleId, setRoleId] = React.useState(
    selectedUser.organization && selectedUser.role ? selectedUser.role.id : -1,
  );

  const isFormValid =
    fio.trim() !== '' &&
    email.trim() !== '' &&
    (selectedUser.username !== fio.trim() ||
      selectedUser.email !== email.trim() ||
      (selectedUser.organization ? selectedUser.organization.id : -1) !== orgId ||
      (selectedUser.organization && selectedUser.role ? selectedUser.role.id : -1) !==
        roleId);

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleUpdate = () => {
    usersStore.updateUser({
      id: props.userId,
      username: fio,
      email: email,
      organization: orgId !== -1 ? orgsStore.getOrg(orgId) : undefined,
      role: orgId !== -1 && roleId !== -1 ? rolesStore.getRole(roleId) : undefined,
    });

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
                value={orgId}
                onChange={(event) => {
                  if (typeof event.target.value === 'number') {
                    setOrgId(event.target.value);
                  }
                }}>
                <MenuItem key={-1} value={-1}>
                  <em>Не назначена</em>
                </MenuItem>
                {orgsStore.orgs.map((org) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {orgId !== -1 ? (
              <FormControl variant="standard">
                <InputLabel id="role-label">Роль</InputLabel>
                <Select
                  labelId="role-label"
                  variant="standard"
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
              handleUpdate();
            }}>
            Изменить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
/* диалог "изменение пользователя" (конец) */

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
    usersStore.removeUser(props.usersIds);
    props.setOpen(false);
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>Удаление пользователей</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Запрошено удаление {props.usersIds.length} пользователей. Продолжить удаление?
          </DialogContentText>
        </DialogContent>
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

export function Users() {
  const { usersStore } = useStore();
  const [showUserData, setShowUserData] = React.useState<IUser[]>(usersStore.users);

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [findedCount, setFindedCount] = React.useState(-1);

  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [removeUsersOpen, setRemoveUsersOpen] = React.useState(false);

  React.useEffect(() => {
    setShowUserData(usersStore.users);
  }, [usersStore.users]);

  const handleSearchChange = (search: string) => {
    const newUserData: IUser[] = usersStore.users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        (user.organization?.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (user.role?.name || '').toLowerCase().includes(search.toLowerCase()) ||
        DateToString(user.createdAt || new Date(0, 0, 0)).includes(search.toLowerCase()),
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
      <DialogUserAdd isOpen={addUserOpen} setOpen={setAddUserOpen} />

      {/* панель "изменение пользователя" */}
      {selectedIds.length === 1 ? (
        <DialogUserEdit
          isOpen={editUserOpen}
          userId={selectedIds[0]}
          setOpen={setEditUserOpen}
        />
      ) : null}

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
                  Выбрано {selectedIds.length} записей
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
