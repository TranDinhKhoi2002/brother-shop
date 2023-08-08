import { ReactElement } from 'react';
import Head from 'next/head';
import withBreadcrumbs from '@/hocs/breadcrumbs';
import { BreadcrumbItem } from '@/redux/slices/breadcrumb';

export type PageContainerProps = {
  children: ReactElement;
  barTitle?: string;
  headTitle: string;
  breadcrumbs?: BreadcrumbItem[];
};

function PageContainer({ children, headTitle }: PageContainerProps): ReactElement {
  return (
    <>
      <Head>
        <title>{headTitle} | Brother Shop</title>
      </Head>
      {children}
    </>
  );
}

export default withBreadcrumbs(PageContainer);
