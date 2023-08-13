import { ReactElement } from 'react';
import Head from 'next/head';
import withBreadcrumbs from '@/hocs/breadcrumbs';

interface BreadcrumbItem {
  id: string;
  url: string;
  name: string;
}

export type PageContainerProps = {
  children: ReactElement;
  barTitle?: string;
  headTitle: string;
  breadcrumbs?: BreadcrumbItem[];
};

function PageContainer({
  children,
  headTitle,
  renderBreadcrumbs,
}: PageContainerProps & { renderBreadcrumbs: () => ReactElement }): ReactElement {
  return (
    <>
      <Head>
        <title>{headTitle} | Brother Shop</title>
      </Head>
      <div className="xl:px-[5%]">
        <div className="flex items-center py-1 px-4 mb-2 bg-[#e9ecef]">{renderBreadcrumbs()}</div>
        {children}
      </div>
    </>
  );
}

export default withBreadcrumbs(PageContainer);
