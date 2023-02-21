import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import 'regenerator-runtime/runtime';

import createEmotionCache from '@/common/utility/createEmotionCache';
import ThemeProvider from '@/common/styles/theme';
import '@/common/styles/globals.css';
import MainLayout from '@/common/components/Layout/MainLayout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          {getLayout(
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>,
          )}
        </ThemeProvider>
        <ToastContainer autoClose={3000} limit={3} pauseOnFocusLoss={false} theme="colored" />
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
