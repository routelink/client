import { AxiosResponse } from 'axios';

import { IOrganization } from '@app/models';

import api from '../api/api';

export class OrganizatonsService {
  async list(): Promise<IOrganization[]> {
    return await api
      .get('/api/organizations')
      .then((response: AxiosResponse<IOrganization[]>) => {
        return response.data.map((org): IOrganization => {
          return {
            ...org,
            createdAt: org.createdAt ? new Date(org.createdAt) : undefined,
            updatedAt: org.updatedAt ? new Date(org.updatedAt) : undefined,
          };
        });
      })
      .catch(() => {
        return [];
      });
  }

  async create(name: string): Promise<void> {
    await api.post('/api/organizations', { name: name });
  }

  async update(id: number, name: string): Promise<void> {
    await api.patch('/api/organizations/' + id, { name: name });
  }

  async remove(id: number): Promise<void> {
    await api.delete('/api/organizations/' + id);
  }
}
