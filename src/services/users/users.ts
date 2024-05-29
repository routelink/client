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
    return api.post('/api/users', {
      ...user,
      roleId: user.role?.id,
      organizationId: user.organization?.id,
      transportId: user.transport?.id,
    });
  }

  update(id: number, user: Partial<IUser>) {
    return api.patch(`/api/users/${id}`, {
      ...user,
      roleId: user.role?.id,
      organizationId: user.organization?.id,
      transportId: user.transport?.id,
    });
  }

  delete(id: number) {
    return api.delete(`/api/users/${id}`);
  }
}
