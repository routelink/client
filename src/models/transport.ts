import { IMetaContext, IOrganization } from '@app/models';

export interface ITransport extends IMetaContext {
  name: string;
  type: ITypeTransport;
  regNumber?: string;
  avgConsumption?: number;
  organisation?: IOrganization;
  unit?: string;
  mileage?: string;
}
export interface ITypeTransport {
  id: number;
  name: string;
  image?: string;
}
