import { PageContainerProps } from '@/common/components/Layout/PageContainer';
import { Breadcrumbs, Typography } from '@mui/material';
import { ComponentType } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import config from '@/config';

export interface Breadcrumb {
  label: string;
  path: string | undefined;
}

const withBreadcrumbs = (Component: ComponentType<PageContainerProps>) => {
  const BreadcrumbsComponent = (props: PageContainerProps) => {
    return (
      <Component {...props}>
        <div className="mt-20 xl:px-[5%]">
          <div className="flex items-center py-1 px-4 mb-2 bg-[#e9ecef]">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href={config.routes.home} className="hover:underline">
                Trang chủ
              </Link>
              {props.breadcrumbs ? (
                props.breadcrumbs.map((breadcrumb, index) => {
                  if (index !== props.breadcrumbs!.length - 1) {
                    return (
                      <Link href={breadcrumb.url} key={breadcrumb.id} className="hover:underline">
                        {breadcrumb.name}
                      </Link>
                    );
                  }
                  return (
                    <Typography key={breadcrumb.id} className="font-medium">
                      {breadcrumb.name}
                    </Typography>
                  );
                })
              ) : (
                <Typography className="font-medium">{props.barTitle}</Typography>
              )}
            </Breadcrumbs>
          </div>
          {props.children}
        </div>
      </Component>
    );
  };

  BreadcrumbsComponent.displayName = `withBreadcrumbs(${Component.displayName || Component.name})`;
  return BreadcrumbsComponent;
};

export default withBreadcrumbs;
