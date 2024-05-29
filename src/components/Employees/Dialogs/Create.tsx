import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { Modal } from '@app/components';
import { IUser } from '@app/models';
import { useStore } from '@app/store';

interface Create {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id?: number;
}
export function Create(props: Create) {
  const { isOpen, setIsOpen, id } = props;
  const { employeesStore, rolesStore, transportStore } = useStore();
  const [user, setUser] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [transport, setTransport] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [employees, setEmployees] = useState<IUser[]>([]);

  useEffect(() => {
    const getEmployyes = async () => {
      if (!id) {
        setEmployees(await employeesStore.getFreeCollection());
      }
      transportStore.getData({});
    };
    getEmployyes();
  }, []);
  useEffect(() => {
    if (role === 3) setVisible(true);
    else setVisible(false);
  }, [role]);

  useEffect(() => {
    if (user && role) setFormValid(true);
    else setFormValid(false);
    if (role === 3 && !transport) {
      setFormValid(false);
    }
  }, [role, user, transport]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    const option = {
      roleId: role!,
      userId: user!,
      transportId: role === 3 && transport ? transport : undefined,
    };

    employeesStore.create(option).then(() => {
      setIsOpen(false);
    });
  };

  return (
    <>
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
                  <Typography variant="h5">Добавить сотрудника</Typography>

                  <Box component={'form'}>
                    <Stack spacing={2}>
                      <FormControl variant="standard">
                        <InputLabel id="user-label">Сотрудник</InputLabel>
                        <Select
                          required
                          labelId="user-label"
                          variant="standard"
                          label="Сотрудник"
                          value={user}
                          onChange={(event) => {
                            if (typeof event.target.value === 'number') {
                              setUser(event.target.value);
                            }
                          }}>
                          {employees.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                              {user.username}
                            </MenuItem>
                          ))}
                          {employees.length === 0 && (
                            <MenuItem disabled>Нет сотрудников</MenuItem>
                          )}
                        </Select>
                      </FormControl>

                      <FormControl variant="standard">
                        <InputLabel id="role-label">Роль</InputLabel>
                        <Select
                          required
                          labelId="role-label"
                          variant="standard"
                          label="Роль"
                          value={role}
                          onChange={(event) => {
                            if (typeof event.target.value === 'number') {
                              setRole(event.target.value);
                            }
                          }}>
                          {rolesStore.roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {visible ? (
                        <FormControl variant="standard">
                          <InputLabel id="transport-label">
                            Транспортное средство
                          </InputLabel>
                          <Select
                            required
                            labelId="transport-label"
                            variant="standard"
                            value={transport}
                            onChange={(event) => {
                              if (typeof event.target.value === 'number') {
                                setTransport(event.target.value);
                              }
                            }}>
                            {transportStore.tableData.map((transport) => (
                              <MenuItem key={transport.id} value={transport.id}>
                                {transport.name} - {transport.regNumber}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : null}
                    </Stack>
                  </Box>
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
        }}
      </Observer>
    </>
  );
}
