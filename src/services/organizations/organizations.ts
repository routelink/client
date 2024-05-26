import { AxiosResponse } from 'axios';

import { IOrganization } from '@app/models';

import api from '../api/api';

export class OrganizatonsService {
  async list(): Promise<IOrganization[]> {
    try {
      const response: AxiosResponse<IOrganization[]> =
        await api.get('/api/organizations');
      return response.data.map((org): IOrganization => {
        return {
          ...org,
          createdAt: org.createdAt ? new Date(org.createdAt) : undefined,
          updatedAt: org.updatedAt ? new Date(org.updatedAt) : undefined,
        };
      });
    } catch {
      return [];
    }
  }

  async create(name: string): Promise<void> {
    try {
      await api.post('/api/organizations', { name: name });
    } catch {
      return;
    }
  }

  async update(id: number, name: string): Promise<void> {
    try {
      await api.patch('/api/organizations/' + id, { name: name });
    } catch {
      return;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await api.delete('/api/organizations/' + id);
    } catch {
      return;
    }
  }
}
