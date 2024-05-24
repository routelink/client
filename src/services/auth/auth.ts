import api from '@app/services/api/api';

export class AuthService {
  static login<T>(email: string, password: string): Promise<T> {
    return api.post<any, T>(
      '/auth/login',
      { email, password },
      { withCredentials: true },
    );
  }
  static refresh<T>(): Promise<T> {
    return api.request({
      url: '/auth/refresh',
      method: 'POST',
      withCredentials: true,
    });
  }

  static logout() {
    return api.post('/auth/logout', {}, { withCredentials: true });
  }
  static logoutAll() {
    return api.post('/auth/logout/all', {}, { withCredentials: true });
  }
}
