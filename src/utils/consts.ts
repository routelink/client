import { ITypeTransport } from '@app/models';

// @TODO вопрос как лучше сделать
export const TRANSPORT_TYPES: ITypeTransport[] = [
  {
    id: 1,
    name: 'A',
  },
  {
    id: 2,
    name: 'B',
  },
  {
    id: 3,
    name: 'C',
  },
  {
    id: 4,
    name: 'D',
  },
] as const;
