import { makeAutoObservable } from 'mobx';

import { IService } from '@app/models';
import { ServiceService } from '@app/services/analytics/analytics';

export class ServiceStore {
  services: IService[] = [];
  loading: boolean = false;
  error: string | null = null;

  private readonly serviceService = new ServiceService();

  constructor() {
    makeAutoObservable(this);
  }

  async fetchServices() {
    this.loading = true;
    try {
      const response = await this.serviceService.getService();
      this.services = response.data as IService[]; // Извлекаем данные из ответа и приводим их к типу IService[]
    } catch (error: any) {
      this.error = error.message || 'Failed to fetch services';
    } finally {
      this.loading = false;
    }
  }
}
