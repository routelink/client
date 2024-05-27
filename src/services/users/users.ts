import { IUser } from '@app/models';
import { api } from '@app/services';

export class UserService {
  getCollection(params?: any) {
    return api.get('/api/users', { params: params });
  }
  getItem(id: number) {
    return api.get(`/api/users/${id}`);
  }

  create(user: Partial<IUser>) {
    return api.post('/api/users', user);
  }
  update(user: Partial<IUser>) {
    return api.patch(`/api/users/${user.id}`, user);
  }

  delete(id: number) {
    return api.delete(`/api/users/${id}`);
  }
}
