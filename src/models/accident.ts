import { IMetaContext, ITransport, IUser } from '@app/models';
export interface IAccident extends IMetaContext {
  transport: ITransport;
  user: IUser;
  isUser: boolean;
}
