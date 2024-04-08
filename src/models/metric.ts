import { ICoords, IMetaContext, ITransport, IUser } from '@app/models';
export interface IMetric extends IMetaContext {
  transport: ITransport;
  coords: ICoords;
  user: IUser;
}
