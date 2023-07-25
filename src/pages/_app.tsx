import React, { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import 'regenerator-runtime/runtime';
import { createEmotionCache } from '@/utils/common';
import ThemeProvider from '@/common/styles/theme';
import MainLayout from '@/common/components/Layout/MainLayout';
import GoogleAnalytics from '@/modules/ga';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/common/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (props: AppLayoutProps) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider>
          {getLayout(
            <MainLayout>
              <GoogleAnalytics />
              <Component {...pageProps} />
            </MainLayout>,
          )}
        </ThemeProvider>
        <ToastContainer autoClose={3000} limit={5} pauseOnFocusLoss={false} theme="colored" />
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;
