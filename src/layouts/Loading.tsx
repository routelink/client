import { HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
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
    async function (error) {
      const expired =
        error.response?.status === HttpStatusCode.Unauthorized &&
        (error.response?.data as any).status === AUTH.EXPIRED_ACCESS_TOKEN;
      if (!expired) {
        if (error.response?.data) {
          appStore.error = `Ошибка: ${(error.response.data as any).message}`;
        } else {
          appStore.error = `${error.status ?? ''}  ${error.message}`;
        }
      }
      appStore.loading = false;
      const originalRequest = error.config;
      if (expired && !originalRequest._retry) {
        try {
          originalRequest._isRetry = true;

          await authStore.refresh();
          return api(originalRequest);
        } catch (e) {
          console.error(e);
        }
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
