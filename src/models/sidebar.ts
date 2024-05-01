import { SvgIconComponent } from '@mui/icons-material';

export interface Link {
  text: string;
  href: string;
  icon: SvgIconComponent;
  exact?: boolean;
}
