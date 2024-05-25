import { action, makeObservable, observable } from 'mobx';

import BadgeIcon from '@mui/icons-material/Badge';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';

import { Link } from '@app/models';

export class LinksStore {
  links: Link[] = [
    {
      href: '/',
      text: 'Профиль',
      icon: PersonIcon,
      exact: true,
      role: [1, 2, 3, 4],
    },
    {
      href: '/maps',
      text: 'Карта',
      icon: NearMeIcon,
      role: [1, 2, 3],
    },
    {
      href: '/transport',
      text: 'Управление транспортом',
      icon: DirectionsCarIcon,
      role: [1, 2],
    },
    {
      href: '/employees',
      text: 'Управление сотрудниками',
      icon: BadgeIcon,
      role: [1, 2],
    },
    {
      href: '/analytics',
      text: 'Аналитика',
      icon: InsertChartIcon,
      role: [1, 2],
    },
    {
      href: '/users',
      text: 'Пользователи',
      icon: PeopleAltIcon,
      role: [1],
    },
    {
      href: '/organizations',
      text: 'Организации',
      icon: CorporateFareIcon,
      role: [1],
    },
  ];
  constructor() {
    makeObservable(this, {
      links: observable,
      getLinks: action,
      setLinks: action,
      deleteLink: action,
    });
  }
  getLinks(): Link[] {
    return this.links;
  }
  setLinks(links: Link[]): void {
    this.links = [...links];
  }
  addLink(link: Link): void {
    this.links.push(link);
  }
  getTitle(href: string): string {
    return this.links.find((item) => item.href === href)?.text ?? document.title;
  }
  deleteLink(link: Link): void {
    this.links.splice(
      this.links.findIndex((item) => item === link),
      1,
    );
  }
}
