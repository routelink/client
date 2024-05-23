import { IMetaContext, IOrganization, IRole } from '@app/models';

export interface IUser extends IMetaContext {
  name?: string;
  username: string;
  email: string;
  organization?: IOrganization;
  role?: IRole;
  avatar?: string;
}
