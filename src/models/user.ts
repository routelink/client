import { IMetaContext, IOrganization, IRole } from '@app/models';

export interface IUser extends IMetaContext {
  username: string;
  email: string;
  organization?: IOrganization;
  avatar?: string;

  /* TODO: delete   */
  [key: string]: any;
  role?: IRole;
}
