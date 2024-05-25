import { GetItemsParams, ITransport, TransportTypes } from '@app/models';

import api from '../api/api';

export class TransportService {
  async getTransportTypes(): Promise<TransportTypes | null> {
    try {
      const { data } = await api.get('transport/types');
      return data as TransportTypes;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getRows({
    page = 1,
    count = 10,
    search = '',
    sortBy,
    sortOrder,
  }: GetItemsParams): Promise<{ rows: ITransport[] } | null> {
    try {
      const { data } = await api.post('transport/items', {
        page,
        count,
        search,
        sortBy,
        sortOrder,
      });
      return data as { rows: ITransport[] };
    } catch (err) {
      return null;
    }
  }
}
