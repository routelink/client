import { ITransport } from '@app/models';

export type TransportTypes = { id: number; name: string }[];
export type AddTransport = Pick<
  ITransport,
  'name' | 'avgConsumption' | 'unit' | 'typeId' | 'regNumber'
>;
