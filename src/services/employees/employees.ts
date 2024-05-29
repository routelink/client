import { IUser } from '@app/models';
import { api } from '@app/services';

export class EmployeesService {
  getCollection(params?: any) {
    return api.get('/api/employees', { params: params });
  }
  getFreeCollection(params?: any) {
    return api.get('/api/employees/free', { params: params });
  }
  getItem(id: number) {
    return api.get(`/api/employees/${id}`);
  }

  create(options: { roleId: number; userId: number; transportId?: number }) {
    return api.post('/api/employees', options);
  }
  update(user: Partial<IUser>) {
    return api.patch(`/api/employees/${user.id}`, user);
  }

  delete(id: number) {
    return api.delete(`/api/employees/${id}`);
  }
}
