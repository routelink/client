import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Modal } from '@app/components';
import { useStore } from '@app/store';

interface UpdateProps {
  isOpen: boolean;
  id: number;
  setIsOpen: (value: boolean) => void;
}

export function Update(props: UpdateProps) {
  return (
    <Observer>
      {() => {
        const { isOpen, setIsOpen, id } = props;
        const { rolesStore, employeesStore, transportStore } = useStore();
        // const [user, setUser] = useState<IUser | null>(null);
        const [role, setRole] = useState<number | null>(null);
        const [transport, setTransport] = useState<number | null>(null);
        const [visible, setVisible] = useState(false);
        const [isFormValid, setFormValid] = useState(false);
        useEffect(() => {
          const getEmployye = async () => {
            const user = await employeesStore.getItem(id);
            // setUser(user);
            setRole(user.role.id);
            if (user.role.id === 3 && user.transport) {
              setTransport(user.transport.id);
            }
          };
          getEmployye();
          transportStore.getData({});
          rolesStore.loadRoles();
        }, []);
        useEffect(() => {
          if (role === 3 && !transport) {
            setFormValid(false);
          } else setFormValid(true);
        }, [role, transport]);

        useEffect(() => {
          if (role === 3) setVisible(true);
          else setVisible(false);
        }, [role]);

        const handleUpdate = () => {
          const option = {
            roleId: role!,
            userId: id,
            transportId: role === 3 && transport ? transport : undefined,
          };
          employeesStore.create(option).then(() => {
            setIsOpen(false);
          });
        };

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
                      <InputLabel id="role-label">Роль</InputLabel>
                      <Select
                        required
                        labelId="role-label"
                        variant="standard"
                        label="Роль"
                        value={role ?? ''}
                        onChange={(e) => {
                          if (typeof e.target.value === 'number') {
                            setRole(e.target.value);
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
                <Button variant="outlined" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>

                <Button
                  disabled={!isFormValid}
                  variant="contained"
                  onClick={() => {
                    handleUpdate();
                  }}>
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
