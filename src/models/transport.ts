import { IMetaContext, IOrganisation } from '@app/models';

export interface ITransport extends IMetaContext {
  name: string;
  type: ITypeTransport;
  regNumber?: string;
  avgConsumption?: number;
  organisation?: IOrganisation;
  unit?: string;
}
interface ITypeTransport {
  id: string;
  name: string;
  image?: string;
}
