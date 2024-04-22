import { action, makeObservable, observable } from 'mobx';

import { IOrganizationStrict } from '@app/models';

export class OrganizatonsStore {
  orgs: IOrganizationStrict[] = [];
  constructor() {
    this.loadOrgs();
    makeObservable(this, {
      orgs: observable,
      addOrgs: action,
      loadOrgs: action,
    });
  }

  loadOrgs(): void {
    /* Заглушка. Заменить на поучении данных с сервера */
    this.orgs = [
      { id: 1, name: 'ООО Ивановы', createdAt: new Date(2020, 1, 1) },
      { id: 2, name: 'ЗАО Петровы', createdAt: new Date(2020, 2, 2) },
      { id: 3, name: 'НКО Сидоровы', createdAt: new Date(2021, 3, 3) },
    ];
  }

  addOrgs(orgName: string): void {
    const id = this.orgs.reduce((max, org) => (org.id > max ? org.id : max), 0) + 1;
    const date = new Date();
    this.orgs.push({ id: id, name: orgName, createdAt: date });
  }
}
