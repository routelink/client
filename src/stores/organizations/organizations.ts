import { action, makeObservable, observable } from 'mobx';

import { IOrganizationStrict } from '@app/models';

export class OrganizatonsStore {
  orgs: IOrganizationStrict[] = [];
  constructor() {
    this.loadOrgs();
    makeObservable(this, {
      orgs: observable,
      loadOrgs: action,
      addOrgs: action,
      removeOrgs: action,
    });
  }

  loadOrgs(): void {
    /* Заглушка. Заменить на получении данных с сервера */
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

  removeOrgs(ids: number[]): void {
    /* Заглушка. Заменить на удаление данных с сервера и загрузку обновленных данных с сервера */
    this.orgs = this.orgs.filter((org) => !ids.includes(org.id));
    console.log(this.orgs.map((obj) => obj.id));
  }
  /*
  getOrg(id: IOrganizationStrict): void {

  }

  updateOrg(org: IOrganizationStrict): void {

  }
*/
}
