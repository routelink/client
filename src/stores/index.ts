import { AppStore } from './app';
import { UsersStore } from './users';

export type RootStore = {
  appStore: AppStore;
  usersStore: UsersStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  usersStore: new UsersStore(),
};

export default rootStore;
