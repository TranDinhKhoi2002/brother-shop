import { ReactElement } from 'react';
import Head from 'next/head';
import NavigationLayout from './NavigationLayout';

type PageContainerProps = {
  children: ReactElement;
  barTitle: string;
  headTitle: string;
};

function PageContainer({ children, barTitle, headTitle }: PageContainerProps): ReactElement {
  return (
    <>
      <Head>
        <title>{headTitle} | Brother Shop</title>
      </Head>
      <NavigationLayout title={barTitle}>{children}</NavigationLayout>
    </>
  );
}

export default PageContainer;
