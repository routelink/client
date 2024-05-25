import { action, makeObservable, observable } from 'mobx';

import { IOrganization } from '@app/models';
import { OrganizatonsService } from '@app/services';

export class OrganizatonsStore {
  orgs: IOrganization[] = [];
  private readonly organizatonsService = new OrganizatonsService();

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

  // прежняя реализация
  // async loadOrgs() : Promise<void> {
  //   this.organizatonsService.list2
  //     <AxiosResponse<IOrganization[]>>().then(
  //       action((response: AxiosResponse<IOrganization[]>) => {
  //         this.orgs = response.data.map((org): IOrganization => {
  //           return { ...org, createdAt: new Date(org.createdAt || '') };
  //         });
  //       }),
  //     )
  // }

  loadOrgs() {
    this.organizatonsService.list().then((orgs) => {
      this.orgs = orgs;
    });
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
