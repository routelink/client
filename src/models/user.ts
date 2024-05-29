import { IMetaContext, IOrganization, IRole, ITransport } from '@app/models';

export interface IUser extends IMetaContext {
  username: string;
  email: string;
  organization?: IOrganization;
  role: IRole;
  avatar?: string;
  transport?: ITransport;
  password?: string;
}
