import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { IUser } from '@app/models';
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
    usersStore.getCollection();
    orgsStore.loadOrgs();
    rolesStore.loadRoles();
  }, []);

  const selectedUser: IUser | undefined = usersStore.getUser(props.userId);
  if (!selectedUser) {
    props.setOpen(false);
    return <></>;
  }

  const [fio, setFio] = useState(selectedUser.username);
  const [email, setEmail] = useState(selectedUser.email);
  const [orgId, setOrgId] = useState(selectedUser.organization?.id || -1);
  const [roleId, setRoleId] = useState(selectedUser.role?.id || -1);

  const isFormHaveChange =
    fio.trim() !== selectedUser.username ||
    email.trim() !== selectedUser.email ||
    orgId !== selectedUser.organization?.id ||
    roleId !== selectedUser.role?.id;

  const isFormValid =
    fio.trim() !== '' &&
    email.trim() !== '' &&
    isFormHaveChange &&
    /* RL-admin not have org */
    ((roleId === 1 && orgId === -1) ||
      /* all other role must have org */
      (roleId !== 1 && roleId !== -1 && orgId !== -1));

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleUpdate = () => {
    usersStore.update(props.userId, {
      username: fio,
      email: email,
      role: rolesStore.getRole(roleId),
      organization: orgsStore.getOrg(orgId),
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
                {rolesStore.roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {roleId === 1 && orgId !== -1 ? (
              <Typography variant="body2">
                Примечание: администратор платформы не может быть членом организации
              </Typography>
            ) : null}

            {!isFormHaveChange ? (
              <Typography variant="body2">Примечание: не выбраны изменения</Typography>
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
