import { ThemeProvider } from 'styled-components';

import { pixelToVwMobile, pixelToVwDesktop } from '@/utils/pixelToVw';

const theme = {
  color: {
    white: '#FFF',
    black: '#000',
    blue: '#172162',
    lightGrey: '#6e7484',
  },

  flex: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    between: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    evenly: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  },

  vw: {
    mobile: pixelToVwMobile,
    desktop: pixelToVwDesktop,
  },

  transition: {
    short: {
      transition: 'all 0.15s ease',
    },
    medium: {
      transition: 'all 0.3s ease',
    },
    long: {
      transition: 'all 0.45s ease',
    },
  },
};

const StyledComponentsThemeProvider = ({ children }: any) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default StyledComponentsThemeProvider;
