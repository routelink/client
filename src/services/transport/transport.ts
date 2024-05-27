import { GetItemsParams } from '@app/models';
import { api } from '@app/services';

export class TransportService {
  async getRows({ page = 1, count = 10, search = '' }: GetItemsParams) {
    try {
      const { data } = await api.post('transport/items', { page, count, search });
      return data;
    } catch (err) {}
  }
}
