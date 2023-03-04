import theme from '@/configs/mui';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

import '../styles/reset.css';
import AppLayout from '@/layouts/AppLayout';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getMainLayout?: (page: ReactElement) => ReactNode;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

function CustomApp({ Component, pageProps }: AppWithProps) {
  const getMainLayout =
    Component.getMainLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  return (
    <>
      <Head>
        <title>Open Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        {getMainLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
