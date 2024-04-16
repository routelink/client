import { ICoords, IMetaContext, ITransport, IUser } from '@app/models';

export interface IMetrica extends IMetaContext {
  transport: ITransport;
  coords: ICoords;
  user: IUser;
}
