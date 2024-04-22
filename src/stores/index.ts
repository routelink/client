import { AppStore } from './app';
import { TransportStore } from './transport';

export type RootStore = {
  appStore: AppStore;
  transportStore: TransportStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  transportStore: new TransportStore(),
};

export default rootStore;
