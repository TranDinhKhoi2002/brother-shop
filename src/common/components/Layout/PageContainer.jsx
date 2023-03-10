import Head from 'next/head';
import NavigationLayout from './NavigationLayout';

function PageContainer({ children, barTitle, headTitle }) {
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
