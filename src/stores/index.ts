import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';
import { TransportStore } from './transport';
import { UsersStore } from './users';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;
  usersStore: UsersStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),
  usersStore: new UsersStore(),
};

export default rootStore;
