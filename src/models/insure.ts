import { IMetaContext, ITransport, IUser } from '@app/models';

export interface IInsure extends IMetaContext {
  description: string;
  transport: ITransport;
  user: IUser;
  is_user: boolean;
}
