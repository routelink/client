import { ICoords, IMetaContext, ITransport, IUser } from '@app/models';

export interface IMetrica extends IMetaContext {
  transport: ITransport;
  transportId: number;
  coords: ICoords;
  user: IUser;
}
