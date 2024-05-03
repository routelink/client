import { LinksStore } from '@app/stores/links';
import { MapsStore } from '@app/stores/maps';
import { TitleStore } from '@app/stores/title';

import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';
import { TransportStore } from './transport';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;
  mapsStore: MapsStore;
  linksStore: LinksStore;
  titleStore: TitleStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),
  mapsStore: new MapsStore(),
  linksStore: new LinksStore(),
  titleStore: new TitleStore(),
};

export default rootStore;
