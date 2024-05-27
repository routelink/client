import { IMetaContext, IOrganization } from '@app/models';

export interface ITransport extends IMetaContext {
  name: string;
  typeId: number | string;
  regNumber?: string;
  avgConsumption?: number;
  organisation?: IOrganization;
  unit?: string;
  mileage?: string;
}

export interface ITransportHeaders {}
