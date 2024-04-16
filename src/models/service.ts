import { IMetaContext, ITransport } from '@app/models';

export interface IService extends IMetaContext {
  description: string;
  transport: ITransport;
  lenght: number;
  sum: number;
}
