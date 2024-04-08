import { IMetaContext, IOrganisation } from '@app/models';
export interface IUser extends IMetaContext {
  username: string;
  email: string;
  organisation?: IOrganisation;
}
