import type { AppProps } from 'next/app';
import GlobalStyles from '@/theme/GlobalStyles';
import StyledComponentsThemeProvider from '@/theme/StyledComponentsTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <StyledComponentsThemeProvider>
        <Component {...pageProps} />
      </StyledComponentsThemeProvider>
    </>
  );
}
