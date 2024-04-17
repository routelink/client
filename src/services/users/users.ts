import { api } from '@app/services';

export interface UsersFilter {
  page?: number;
}

export class UsersService {
  getUsers(options?: UsersFilter) {
    return api.get('/users', { params: options });
  }
}
