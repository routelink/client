import { IMetaContext, ITransport } from '@app/models';

export interface IService extends IMetaContext {
  description: string;
  transport: ITransport;
  length: number;
  sum: number;
}
