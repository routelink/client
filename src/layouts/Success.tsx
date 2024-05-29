import { Observer } from 'mobx-react-lite';

import { Alert, Snackbar } from '@mui/material';

import { useStore } from '@app/store';

export function Success() {
  const { appStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Snackbar
            open={!!appStore.success}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => (appStore.success = null)}>
            <Alert
              onClose={() => (appStore.success = null)}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}>
              {appStore.success}
            </Alert>
          </Snackbar>
        );
      }}
    </Observer>
  );
}
