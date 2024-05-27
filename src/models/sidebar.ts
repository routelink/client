import { SvgIconComponent } from '@mui/icons-material';

import { TRole } from './role';

export interface Link {
  text: string;
  href: string;
  icon: SvgIconComponent;
  exact?: boolean;
  role: TRole[];
  children?: Link[];
}
