import { GetItemsParams } from '@app/models';

import api from '../api/api';

export class TransportService {
  async getRows({
    page = 1,
    count = 10,
    search = '',
    sortBy,
    sortOrder,
  }: GetItemsParams) {
    try {
      const { data } = await api.post('transport/items', {
        page,
        count,
        search,
        sortBy,
        sortOrder,
      });
      return data;
    } catch (err) {}
  }
}
