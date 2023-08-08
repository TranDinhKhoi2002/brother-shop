import { ReactElement, useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import PageContainer from '@/common/components/Layout/PageContainer';
import Products from '@/modules/product/components/Products';
import { getProductsByType } from '@/services/productRequests';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';
import config from '@/config';

function ProductsPage({ products, type }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const headTitle = `Sản phẩm ${type} | Brother Shop`;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateBrandNewBreadcrumb({
        item: {
          id: `productType/${type}`,
          url: config.routes.products,
          name: type,
        },
      }),
    );
  }, [dispatch, type]);

  return (
    <PageContainer barTitle={type} headTitle={headTitle}>
      <Products products={products} />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { type } = context.query;
  const products = await getProductsByType(type as string);

  return {
    props: {
      products,
      type,
    },
  };
};

export default ProductsPage;
