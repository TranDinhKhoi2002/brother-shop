import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { Provider, useDispatch } from 'react-redux';
import store from 'src/redux/store';
import 'regenerator-runtime/runtime';

import createEmotionCache from '@/common/utility/createEmotionCache';
import ThemeProvider from '@/common/styles/theme';
import '@/common/styles/globals.css';
import MainLayout from '@/common/components/Layout';

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
