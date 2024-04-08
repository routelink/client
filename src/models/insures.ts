import { IMetaContext, ITransport, IUser } from '@app/models';
export interface IInsures extends IMetaContext {
  transport: ITransport;
  user: IUser;
  isUser: boolean;
}
