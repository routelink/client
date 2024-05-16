import { LinksStore } from '@app/stores/links';
import { MapsStore } from '@app/stores/maps';
import { TitleStore } from '@app/stores/title';

import { AppStore } from './app';
import { AuthStore } from './auth';
import { OrganizatonsStore } from './organizations';
import { ProfileStore } from './profile';
import { TransportStore } from './transport';
import { UsersStore } from './users';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;
  usersStore: UsersStore;
  mapsStore: MapsStore;
  linksStore: LinksStore;
  titleStore: TitleStore;
  profileStore: ProfileStore;
  authStore: AuthStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),
  usersStore: new UsersStore(),
  mapsStore: new MapsStore(),
  linksStore: new LinksStore(),
  titleStore: new TitleStore(),
  profileStore: new ProfileStore(),
  authStore: new AuthStore(),
};

export default rootStore;
