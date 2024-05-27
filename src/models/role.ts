import { IMetaContext } from '@app/models';

export interface IRole extends IMetaContext {
  name: string;
}
export type TRole = 1 | 2 | 3 | 4;
