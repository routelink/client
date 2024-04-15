import { AppStore } from './app';

export type RootStore = {
  appStore: AppStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
};

export default rootStore;
