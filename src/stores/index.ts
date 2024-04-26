import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';
import { TransportStore } from './transport';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),
};

export default rootStore;
