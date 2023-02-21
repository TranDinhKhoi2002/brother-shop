import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import Products from '@/modules/product/components/Products';
import { getProductsByType } from '@/services/productRequests';
import Head from 'next/head';

function ProductsPage({ products, type }) {
  const headTitle = `Sản phẩm ${type} | Brother Shop`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavigationLayout title={type}>
        <Products products={products} />
      </NavigationLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { type } = context.query;
  const products = await getProductsByType(type);

  return {
    props: {
      products,
      type,
    },
  };
}

export default ProductsPage;
