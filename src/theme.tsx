import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      black: '#1F1F1F',
      white: '#F9F9F9',
    },
    primary: {
      main: '#307173',
      dark: '#10484B',
      light: '#68B5B9',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    action: {
      selectedOpacity: 0.8,
    },
    text: {
      primary: '#333333',
      secondary: '#808080',
    },
  },
});

export default theme;
