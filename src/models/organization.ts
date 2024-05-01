import { IMetaContext } from '@app/models';

export interface IOrganization extends IMetaContext {
  name: string;
}

export interface IOrganizationStrict {
  id: number;
  name: string;
  createdAt: Date;
}
