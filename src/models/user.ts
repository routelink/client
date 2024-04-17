import { IMetaContext } from '@app/models';

export interface IUser extends IMetaContext {
  name: string;
  org: string;
  role: string;
  date: string;
}
