import { action, makeObservable, observable } from 'mobx';

import { IRole } from '@app/models';

export class RolesStore {
  roles: IRole[] = [];
  constructor() {
    this.loadRoles();
    makeObservable(this, {
      roles: observable,
      loadRoles: action,
    });
  }

  loadRoles(): void {
    /* Заглушка. Заменить на получении данных с сервера */
    this.roles = [
      { id: 0, name: 'Администратор' },
      { id: 1, name: 'Аналитик' },
      { id: 2, name: 'Водитель' },
    ];
  }

  getRole(orgId: number): IRole | undefined {
    const index = this.roles.findIndex((role) => role.id === orgId);
    if (index === -1) {
      return undefined;
    }
    return this.roles[index];
  }

  getRoleName(orgId: number): string {
    const index = this.roles.findIndex((role) => role.id === orgId);
    if (index === -1) {
      return '';
    }
    return this.roles[index].name;
  }
}
