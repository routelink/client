import { IUser } from '@app/models';
import api from '@app/services/api/api';

export class EmployyesService {
  getCollection(params?: any) {
    return api.get('/api/employees', { params: params });
  }
  getItem(id: number) {
    return api.get(`/api/employees/${id}`);
  }

  create(data: Partial<IUser>) {
    return api.post('/api/employees', data);
  }
  update(id: number, data: Partial<IUser>) {
    return api.patch(`/api/employees/${id}`, data);
  }
  delete(id: number) {
    return api.delete(`/api/employees/${id}`);
  }
}
