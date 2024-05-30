import { api } from '@app/services';

export class InsureService {
  getInsure(params?: any) {
    return api.get('/api/analytics/insure', { params: params });
  }
}

export class ServiceService {
  getService(params?: any) {
    return api.get('/api/analytics/service', { params: params });
  }
}

export class FuelService {
  getFuel(params?: any) {
    return api.get('/api/analytics/fuel', { params: params });
  }
}
