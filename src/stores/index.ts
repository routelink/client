import { AppStore } from './app';
import { LinksStore } from './links';
import { OrganizatonsStore } from './organizations';
import { TitleStore } from './title';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  titleStore: TitleStore;
  linksStore: LinksStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  titleStore: new TitleStore(),
  linksStore: new LinksStore(),
};

export default rootStore;
