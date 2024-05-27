import { AxiosError } from 'axios';
import { Observer } from 'mobx-react-lite';

import { Backdrop, CircularProgress } from '@mui/material';

import { api } from '@app/services';
import { useStore } from '@app/store';

export function Loading() {
  const { appStore } = useStore();
  api.interceptors.request.use(
    (config) => {
      appStore.loading = true;
      return config;
    },
    function (error) {
      appStore.error = 'err';
      appStore.loading = false;
      return Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (config) => {
      appStore.loading = false;
      return config;
    },
    function (error: AxiosError) {
      console.log(error);

      appStore.error = `${error.status ?? ''}  ${error.message}`;
      appStore.loading = false;
      return Promise.reject(error);
    },
  );
  return (
    <Observer>
      {() => {
        return (
          <Backdrop
            className="backdrop-teset"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={appStore.loading}
            onClick={() => {}}>
            <CircularProgress color="inherit" />
          </Backdrop>
        );
      }}
    </Observer>
  );
}
