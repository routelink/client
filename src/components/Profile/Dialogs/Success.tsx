import { Observer } from 'mobx-react-lite';

import { Alert, Snackbar } from '@mui/material';

import { useStore } from '@app/store';

export function Success() {
  //const { appStore } = useStore();
  const { profileStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Snackbar
            open={!!profileStore.success}
            //open={true}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => (profileStore.success = null)}>
            <Alert
              onClose={() => (profileStore.success = null)}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}>
              {profileStore.success}
            </Alert>
          </Snackbar>
        );
      }}
    </Observer>
  );
}
