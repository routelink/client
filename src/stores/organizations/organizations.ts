import { action, makeObservable, observable } from 'mobx';

import { IOrganization } from '@app/models';

export class OrganizatonsStore {
  orgs: IOrganization[] = [];
  constructor() {
    this.loadOrgs();
    makeObservable(this, {
      orgs: observable,
      loadOrgs: action,
      addOrgs: action,
      removeOrgs: action,
      updateOrgName: action,
    });
  }

  loadOrgs(): void {
    /* Заглушка. Заменить на получении данных с сервера */
    this.orgs = [
      { id: 10, name: 'ООО Ивановы', createdAt: new Date(2020, 1, 1) },
      { id: 11, name: 'ЗАО Петровы', createdAt: new Date(2020, 2, 2) },
      { id: 12, name: 'НКО Сидоровы', createdAt: new Date(2021, 3, 3) },
    ];
  }

  addOrgs(orgName: string): void {
    /*  Заглушка. Заменить на добавление данных на сервер
        и загрузку обновленных данных с сервера */
    const id = this.orgs.reduce((max, org) => (org.id > max ? org.id : max), 0) + 1;
    const date = new Date();
    this.orgs.push({ id: id, name: orgName, createdAt: date });
  }

  getOrg(orgId: number): IOrganization | undefined {
    const orgsIndex = this.orgs.findIndex((org) => org.id === orgId);
    if (orgsIndex === -1) {
      return undefined;
    }
    return this.orgs[orgsIndex];
  }

  removeOrgs(ids: number[]): void {
    /*  Заглушка. Заменить на удаление данных с сервера
        и загрузку обновленных данных с сервера */
    this.orgs = this.orgs.filter((org) => !ids.includes(org.id));
  }

  getOrgName(orgId: number): string {
    /*  Подумать:
        надо-ли обновлять данные с сервера перед этим */
    const orgsIndex = this.orgs.findIndex((org) => org.id === orgId);
    if (orgsIndex === -1) {
      return '';
    }
    return this.orgs[orgsIndex].name;
  }

  updateOrgName(orgId: number, orgName: string): void {
    /*  Заглушка. Заменить на изменение данных на сервере
        и загрузку обновленных данных с сервера */
    const orgsIndex = this.orgs.findIndex((org) => org.id === orgId);
    if (orgsIndex === -1) {
      return;
    }
    this.orgs[orgsIndex].name = orgName;
  }
}
