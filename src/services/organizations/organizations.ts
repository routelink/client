import { AxiosResponse } from 'axios';

import { IOrganization } from '@app/models';

import api from '../api/api';

export class OrganizatonsService {
  // прежняя реализация
  // async list<T>(): Promise<T> {
  //   return api.get<any, T>('/api/organizations');
  // }

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
}
