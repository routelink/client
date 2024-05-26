import { action, makeObservable, observable, runInAction } from 'mobx';

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

  getOrgs(filter?: string): IOrganization[] {
    if (!filter || filter.trim() === '') {
      return this.orgs;
    }

    return this.orgs.filter((org) => {
      if (org.name.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    });
  }

  loadOrgs() {
    this.organizatonsService.list().then((orgs) => {
      runInAction(() => {
        this.orgs = orgs;
      });
    });
  }

  addOrgs(orgName: string): void {
    this.organizatonsService.create(orgName).then(() => {
      this.loadOrgs();
    });
  }

  getOrg(orgId: number): IOrganization | undefined {
    const orgsIndex = this.orgs.findIndex((org) => org.id === orgId);
    if (orgsIndex === -1) {
      return undefined;
    }
    return this.orgs[orgsIndex];
  }

  removeOrgs(ids: number[]): void {
    ids.forEach((id) => {
      this.organizatonsService.remove(id).then(() => {
        this.loadOrgs();
      });
    });
  }

  getOrgName(orgId: number): string {
    const orgsIndex = this.orgs.findIndex((org) => org.id === orgId);
    if (orgsIndex === -1) {
      return '';
    }
    return this.orgs[orgsIndex].name;
  }

  updateOrgName(id: number, name: string): void {
    this.organizatonsService.update(id, name).then(() => {
      this.loadOrgs();
    });
  }
}
