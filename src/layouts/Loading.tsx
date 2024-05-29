import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { Observer } from 'mobx-react-lite';

import { Backdrop, CircularProgress } from '@mui/material';

import { AUTH, api } from '@app/services';
import { useStore } from '@app/store';

export function Loading() {
  const { appStore, authStore } = useStore();
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      appStore.loading = true;
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
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
      if (error.response?.data) {
        appStore.error = `Ошибка: ${(error.response.data as any).message}`;
      } else appStore.error = `${error.status ?? ''}  ${error.message}`;

      appStore.loading = false;

      if (
        error.status === HttpStatusCode.Unauthorized &&
        error.response?.status === AUTH.EXPIRED_REFRESH_TOKEN
      ) {
        authStore.refresh();
        console.log('refresh');
      }

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
