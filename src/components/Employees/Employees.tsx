import { Observer } from 'mobx-react-lite';
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

import { Create, Delete } from './Dialogs/';
import { Update } from './Dialogs/Update';
import { EmployeesTable } from './EmployeesTable';

export function Employees() {
  const { employeesStore } = useStore();

  const [searchString, setSearchString] = useState('');

  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    employeesStore.getCollection();
  }, []);

  const handleReloadButton = () => {
    setSelected([]);
    employeesStore.getCollection();
  };

  return (
    <Observer>
      {() => {
        return (
          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Fab
                color="primary"
                onClick={() => {
                  setIsCreate(true);
                }}>
                <AddIcon />
              </Fab>
              <Typography variant="h6">Сотрудники</Typography>
            </Stack>
            <Paper sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" padding={2}>
                <SearchField
                  onInput={(val) => setSearchString(val)}
                  count={
                    employeesStore.employees.filter((item) => filter(item, searchString))
                      .length
                  }
                />
                <Stack direction="row" alignItems="flex-end">
                  {selected.length ? (
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Выбрано {selected.length} записей
                    </Typography>
                  ) : null}
                  <Tooltip title="Изменить выбранное" placement="top">
                    <span>
                      <IconButton
                        disabled={selected.length !== 1}
                        onClick={() => {
                          setIsUpdate(true);
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
                          setIsDelete(true);
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
              <EmployeesTable
                search={searchString}
                selectedState={[selected, setSelected]}
              />
            </Paper>
            {selected.length === 1 && isUpdate ? (
              <Update isOpen={isUpdate} id={selected[0]} setIsOpen={setIsUpdate} />
            ) : null}
            <Delete
              isOpen={isDelete}
              employeesIds={selected}
              setClose={() => setIsDelete(false)}
            />
            {isCreate ? <Create isOpen={isCreate} setIsOpen={setIsCreate} /> : null}
          </Stack>
        );
      }}
    </Observer>
  );
}
function filter(item: IUser, search: string): boolean {
  return (
    item.username.toLowerCase().includes(search.toLowerCase()) ||
    (item.transport?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.role.name || '').toLowerCase().includes(search.toLowerCase())
  );
}
