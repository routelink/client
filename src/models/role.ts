import { IMetaContext } from '@app/models';

export interface IRole extends IMetaContext {
  id: number;
  name: string;
}

export const Role = {
  1: 'Администратор платформы',
  2: 'Администратор',
  3: 'Водитель',
  4: 'Аналитик',
} as const;
