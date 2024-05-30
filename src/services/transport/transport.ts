import { AddTransport, ITransport, TransportTypes } from '@app/models';
import { api } from '@app/services';

export class TransportService {
  async getTransportTypes(): Promise<TransportTypes | null> {
    try {
      const { data } = await api.get('/api/transports/types');
      return data as TransportTypes;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getRows(query: string): Promise<{ rows: ITransport[] } | null> {
    try {
      const { data } = await api.get(`/api/transports?${query}`);

      return data as { rows: ITransport[] };
    } catch (err) {
      return null;
    }
  }

  async editRow(payload: AddTransport, id: number) {
    try {
      const { data } = await api.patch(`/api/transports/${id}`, payload);

      return data as ITransport;
    } catch (err) {
      return null;
    }
  }

  async addRow(payload: AddTransport) {
    try {
      const { data } = await api.post(`/api/transports`, payload);

      return data as ITransport;
    } catch (err) {
      return null;
    }
  }

  async deleteRow(id: ITransport['id']) {
    try {
      await api.delete(`/api/transports/${id}`);
      return true;
    } catch (err) {
      return null;
    }
  }
}
