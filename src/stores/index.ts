import { AppStore } from './app';
import { UsersStore } from './users';
import { OrganizatonsStore } from './organizations';
import { TransportStore } from './transport';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  usersStore: new UsersStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),
};

export default rootStore;
