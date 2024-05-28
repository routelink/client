import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useStore } from '@app/store';

import { Modal } from '../Modal';

export interface DialogUserAddProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddEnd?: () => void;
}
export function DialogUserAdd(props: DialogUserAddProps) {
  const { orgsStore, usersStore, rolesStore } = useStore();

  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState(-1);
  const [roleId, setRoleId] = useState(-1);

  const isFormValid =
    fio.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    /* RL-admin not have org */
    ((roleId === 1 && orgId === -1) ||
      /* all other role must have org */
      (roleId !== 1 && roleId !== -1 && orgId !== -1));

  useEffect(() => {
    orgsStore.loadOrgs();
    rolesStore.loadRoles();
  }, []);

  const handleCancel = () => {
    props.setOpen(false);
    setFio('');
    setEmail('');
    setRoleId(-1);
    setOrgId(-1);
  };

  const handleAdd = async () => {
    usersStore
      .create({
        username: fio,
        email: email,
        password: password,
        role: rolesStore.getRole(roleId),
        organization: orgsStore.getOrg(orgId),
      })
      .then(() => {
        props.setOpen(false);
      });
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
              type="password"
              label="Пароль"
              onChange={(event) => {
                setPassword(event.target.value);
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

            <FormControl variant="standard" required>
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
          </Stack>
        </Stack>

        {roleId === 1 && orgId !== -1 ? (
          <Typography variant="body2">
            Примечание: администратор платформы не может быть членом организации
          </Typography>
        ) : null}

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
              if (props.onAddEnd) {
                props.onAddEnd();
              }
            }}>
            Добавить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
