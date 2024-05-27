import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

export interface DialogUserEditProps {
  isOpen: boolean;
  userId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onEditEnd?: () => void;
}

export function DialogUserEdit(props: DialogUserEditProps) {
  const { orgsStore, rolesStore, usersStore } = useStore();
  useEffect(() => {
    usersStore.getItem(props.userId);
    orgsStore.loadOrgs();
    rolesStore.loadRoles();
  }, []);

  // const selectedUser = usersStore.getUser(props.userId);
  if (!usersStore.user) {
    props.setOpen(false);
    return <></>;
  }

  const [fio, setFio] = useState(usersStore.user.username);
  const [email, setEmail] = useState(usersStore.user.email);
  const [orgId, setOrgId] = useState(
    usersStore.user.organization ? usersStore.user.organization.id : -1,
  );
  const [roleId, setRoleId] = useState(
    usersStore.user.role ? usersStore.user.role.id : -1,
  );

  /* 
   * TODO: FIX
   * const isFormValid =
    fio.trim() !== '' &&
    email.trim() !== '' &&
    (usersStore.user.username !== fio.trim() ||
      usersStore.user.email !== email.trim() ||
      (usersStore.user.organization ? usersStore.user.organization.id : -1) !== orgId ||
      (usersStore.user.organization && usersStore.user.role
        ? usersStore.user.role.id
        : -1) !== roleId); */

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleUpdate = () => {
    usersStore.update({
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
            variant="contained"
            onClick={() => {
              handleUpdate();
              if (props.onEditEnd) {
                props.onEditEnd();
              }
            }}>
            Изменить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
