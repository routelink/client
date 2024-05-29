import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import SyncIcon from '@mui/icons-material/Sync';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useStore } from '@app/store';
import { SearchField } from '@app/ui';

import { DialogPasswordChange } from './DialogPasswordChange';
import { DialogRemoveUsers } from './DialogRemoveUsers';
import { DialogUserAdd } from './DialogUserAdd';
import { DialogUserEdit } from './DialogUserEdit';
import { TableUsers } from './TableUsers';

export function Users() {
  const { usersStore } = useStore();
  const [searchString, setSearchString] = useState('');

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [removeUsersOpen, setRemoveUsersOpen] = useState(false);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    usersStore.getCollection();
  }, []);

  const handleReloadButton = () => {
    setSelected([]);
    usersStore.getCollection();
  };

  return (
    <Observer>
      {() => {
        return (
          <>
            <DialogUserAdd
              isOpen={addUserOpen}
              setOpen={setAddUserOpen}
              onAddEnd={() => {
                setSelected([]);
                usersStore.getCollection();
              }}
            />

            {selected.length === 1 ? (
              <span>
                <DialogUserEdit
                  isOpen={editUserOpen}
                  userId={selected[0]}
                  setOpen={setEditUserOpen}
                  onEditEnd={() => {
                    setSelected([]);
                    usersStore.getCollection();
                  }}
                />
                <DialogPasswordChange
                  isOpen={passwordChangeOpen}
                  userId={selected[0]}
                  setClose={() => setPasswordChangeOpen(false)}
                  onPasswordChangeEnd={() => {
                    setSelected([]);
                  }}
                />
              </span>
            ) : null}

            <DialogRemoveUsers
              isOpen={removeUsersOpen}
              usersIds={selected}
              setClose={() => setRemoveUsersOpen(false)}
              onRemoveEnd={() => {
                setSelected([]);
                usersStore.getCollection();
              }}
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
                    onInput={(val: string) => setSearchString(val)}
                    count={usersStore.getUsers(searchString).length}
                  />
                  <Stack direction="row" alignItems="flex-end">
                    {selected.length ? (
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Выбрано {selected.length} записей
                      </Typography>
                    ) : null}
                    <Tooltip title="Изменить пароль" placement="top">
                      <span>
                        <IconButton
                          disabled={selected.length !== 1}
                          onClick={() => {
                            setPasswordChangeOpen(true);
                          }}>
                          <PasswordIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Изменить выбранное" placement="top">
                      <span>
                        <IconButton
                          disabled={selected.length !== 1}
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
                          disabled={selected.length === 0}
                          onClick={() => {
                            setRemoveUsersOpen(true);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Обновить данные" placement="top">
                      <span>
                        <IconButton onClick={handleReloadButton}>
                          <SyncIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>
                <TableUsers
                  userData={usersStore.getUsers(searchString)}
                  selectedState={[selected, setSelected]}
                />
              </Paper>
            </Stack>
          </>
        );
      }}
    </Observer>
  );
}
