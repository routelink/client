import { IUser } from '@app/models';
import { api } from '@app/services';

export class EmployeeService {
  getCollection(params?: any) {
    return api.get('/api/employees', { params: params });
  }
  getItem(id: number) {
    return api.get(`/api/employees/${id}`);
  }

  create(user: Partial<IUser>) {
    return api.post('/api/employees', user);
  }
  update(user: Partial<IUser>) {
    return api.patch(`/api/employees/${user.id}`, user);
  }

  delete(id: number) {
    return api.delete(`/api/employees/${id}`);
  }
}
