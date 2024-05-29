import axios from 'axios';

import { api } from '@app/services';

export class InsureService {
  getInsure(params?: any) {
    return api.get('/api/analytics/insure', { params: params });
  }
}

export class ServiceService {
  getService(params?: any) {
    return axios.get('/api/analytics/service', { params: params });
  }
}

/*
export class ServiceService {
  async getService(params?: any) {
    try {
      const response = await api.get('/api/analytics/service', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch services');
    }
  }
}
*/

export class FuelService {
  getFuel(params?: any) {
    return api.get('/api/analytics/fuel', { params: params });
  }
}
