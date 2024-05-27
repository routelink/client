import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { IUser } from '@app/models';
import { useStore } from '@app/store';
import { SearchField } from '@app/ui';

import { DialogRemoveUsers } from './DialogRemoveUsers';
import { DialogUserAdd } from './DialogUserAdd';
import { DialogUserEdit } from './DialogUserEdit';
import { TableUsers } from './TableUsers';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
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

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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

export interface IUserTableView {
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
export const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'ФИО' },
  { id: 'email', label: 'Эл. почта' },
  { id: 'orgName', label: 'Организация' },
  { id: 'roleName', label: 'Роль' },
  { id: 'createdAt', label: 'Дата создания' },
];

export interface TableUsersProps {
  userData: IUser[];
  onSelectChange: (selectedIndexArray: readonly number[]) => void;
}

export function Users() {
  const { usersStore } = useStore();
  const [showUserData, setShowUserData] = useState<IUser[]>(usersStore.users);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [findedCount, setFindedCount] = useState(-1);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [removeUsersOpen, setRemoveUsersOpen] = useState(false);

  useEffect(() => {
    setShowUserData(usersStore.users);
  }, [usersStore.users]);

  const handleSearchChange = (search: string) => {
    const newUserData: IUser[] = usersStore.users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        (user.organization?.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (user.role?.name || '').toLowerCase().includes(search.toLowerCase()),

      // DateToString(user.createdAt || new Date(0, 0, 0)).includes(search.toLowerCase()),
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
      <DialogUserAdd isOpen={addUserOpen} setOpen={setAddUserOpen} />

      {selectedIds.length === 1 ? (
        <DialogUserEdit
          isOpen={editUserOpen}
          userId={selectedIds[0]}
          setOpen={setEditUserOpen}
        />
      ) : null}
      <DialogRemoveUsers
        isOpen={removeUsersOpen}
        usersIds={selectedIds}
        setClose={() => setRemoveUsersOpen(false)}
      />
      <Stack direction="column" spacing={2}>
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
          <Stack direction="row" justifyContent="space-between" sx={{ ml: 1 }}>
            <SearchField
              onInput={(val: string) => handleSearchChange(val)}
              count={findedCount}></SearchField>
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
          <TableUsers userData={showUserData} onSelectChange={handleSelectChange} />
        </Paper>
      </Stack>
    </>
  );
}
