import { action, makeObservable, observable } from 'mobx';

import { IUser } from '@app/models';

export class UsersStore {
  users: IUser[] = [];
  constructor() {
    this.loadUsers();
    makeObservable(this, {
      users: observable,
      loadUsers: action,
      removeUsers: action,
    });
  }

  removeUsers(ids: number[]): void {
    /*  Заглушка. Заменить на удаление данных с сервера
        и загрузку обновленных данных с сервера */
    this.users = this.users.filter((user) => !ids.includes(user.id));
  }

  loadUsers(): void {
    /* Заглушка. Заменить на получении данных с сервера */
    this.users = [
      {
        id: 1,
        username: 'Иванов 1',
        email: 'ivanov_1@mail.ru',
        createdAt: new Date(2020, 1, 1),
        organization: { id: 10, name: 'ООО Ивановы' },
        role: { id: 0, name: 'Администратор' },
      },
      {
        id: 2,
        username: 'Иванов 2',
        email: 'ivanov_2@mail.ru',
        createdAt: new Date(2020, 2, 1),
        organization: { id: 10, name: 'ООО Ивановы' },
        role: { id: 1, name: 'Аналитик' },
      },
      {
        id: 3,
        username: 'Иванов 3',
        email: 'ivanov_3@mail.ru',
        createdAt: new Date(2020, 3, 1),
        organization: { id: 10, name: 'ООО Ивановы' },
        role: { id: 2, name: 'Водитель' },
      },
      {
        id: 4,
        username: 'Иванов 4',
        email: 'ivanov_4@mail.ru',
        createdAt: new Date(2020, 4, 2),
        organization: { id: 10, name: 'ООО Ивановы' },
        role: { id: 2, name: 'Водитель' },
      },
      {
        id: 5,
        username: 'Петров 1',
        email: 'petrof_1@mail.ru',
        createdAt: new Date(2021, 1, 1),
        organization: { id: 11, name: 'ЗАО Петровы' },
        role: { id: 0, name: 'Администратор' },
      },
      {
        id: 6,
        username: 'Петров 2',
        email: 'petrof_2@mail.ru',
        createdAt: new Date(2021, 2, 4),
        organization: { id: 11, name: 'ЗАО Петровы' },
        role: { id: 1, name: 'Аналитик' },
      },
      {
        id: 7,
        username: 'Петров 3',
        email: 'petrof_3@mail.ru',
        createdAt: new Date(2021, 3, 9),
        organization: { id: 11, name: 'ЗАО Петровы' },
        role: { id: 2, name: 'Водитель' },
      },
      {
        id: 8,
        username: 'Петров 4',
        email: 'petrof_4@mail.ru',
        createdAt: new Date(2021, 4, 16),
        organization: { id: 11, name: 'ЗАО Петровы' },
        role: { id: 2, name: 'Водитель' },
      },
      {
        id: 9,
        username: 'Сидоров 1',
        email: 'cdoroff_1@mail.ru',
        createdAt: new Date(2022, 1, 1),
        organization: { id: 12, name: 'НКО Сидоровы' },
        role: { id: 0, name: 'Администратор' },
      },
      {
        id: 10,
        username: 'Сидоров 2',
        email: 'cdoroff_2@mail.ru',
        createdAt: new Date(2022, 2, 4),
        organization: { id: 12, name: 'НКО Сидоровы' },
        role: { id: 1, name: 'Аналитик' },
      },
      {
        id: 11,
        username: 'Сидоров 3',
        email: 'cdoroff_3@mail.ru',
        createdAt: new Date(2022, 3, 6),
        organization: { id: 12, name: 'НКО Сидоровы' },
        role: { id: 2, name: 'Водитель' },
      },
      {
        id: 12,
        username: 'Сидоров 4',
        email: 'cdoroff_4@mail.ru',
        createdAt: new Date(2022, 4, 8),
        organization: { id: 12, name: 'НКО Сидоровы' },
        role: { id: 2, name: 'Водитель' },
      },
    ];
  }
}
