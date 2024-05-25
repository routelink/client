import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Typography from '@mui/material/Typography';

import { Modal } from '@app/components';
import { useStore } from '@app/store';

export function AddEmployeeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Fab color="primary" onClick={() => setIsOpen(true)}>
        <AddIcon />
      </Fab>
      <Typography variant="h6">Сотрудник</Typography>
      <Dialog isOpen={isOpen} setOpen={setIsOpen} />
    </Stack>
  );
}

interface DialogProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}
function Dialog(props: DialogProps) {
  const { isOpen, setOpen } = props;
  useEffect(() => {
    employeesStore.getCollection();
    rolesStore.loadRoles();
  }, []);

  const { employeesStore, usersStore, rolesStore, transportStore } = useStore();

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [transport, setTransport] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  const handleChangeUsername = (event: SelectChangeEvent<string>) => {
    setUsername(event.target.value);
  };
  const handleChangeRole = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const handleChangeTransport = (event: SelectChangeEvent<string>) => {
    setTransport(event.target.value);
  };

  useEffect(() => {
    if (role == '2') setIsVisible(true);
    else setIsVisible(false);
  }, [role]);

  const handleCreate = () => {
    employeesStore.create({
      username: username,
      roleId: role,
      transportId: transport ? transport : null,
    });
  };
  return (
    <Observer>
      {() => {
        return (
          <Modal isOpen={isOpen}>
            <Stack
              height="100vh"
              direction="column"
              justifyContent="space-between"
              margin={5}>
              <Stack spacing={3}>
                <Typography variant="h5">Новый cотрудник</Typography>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="employee-name">Сотрудник</InputLabel>
                  <Select
                    labelId="employee-name"
                    value={username}
                    label="Age"
                    onChange={handleChangeUsername}>
                    {usersStore.users.map((u) => (
                      <MenuItem key={u.id} value={u.email}>
                        {u.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="employee-role">Роль</InputLabel>
                  <Select
                    labelId="employee-role"
                    value={role}
                    onChange={handleChangeRole}>
                    {rolesStore.roles.map((u) => (
                      <MenuItem key={u.id} value={u.id}>
                        {u.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {isVisible ? (
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="employee-transport">Транспорт</InputLabel>
                    <Select
                      labelId="employee-transport"
                      value={transport}
                      onChange={handleChangeTransport}>
                      {transportStore.getData().map((u) => (
                        <MenuItem key={u.id} value={u.id}>
                          {u.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                  }}>
                  Отмена
                </Button>

                <Button variant="contained" onClick={handleCreate}>
                  Добавить
                </Button>
              </Stack>
            </Stack>
          </Modal>
        );
      }}
    </Observer>
  );
}
