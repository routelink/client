import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
};

export default rootStore;
