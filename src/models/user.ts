import { IMetaContext, IOrganization, IRole } from '@app/models';

export interface IUser extends IMetaContext {
  username: string;
  email: string;
  organization?: IOrganization;
  role?: IRole;
  avatar?: string;
}
