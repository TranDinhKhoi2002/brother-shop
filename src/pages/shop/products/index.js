import PageContainer from '@/common/components/Layout/PageContainer';
import Products from '@/modules/product/components/Products';
import { getProductsByType } from '@/services/productRequests';

function ProductsPage({ products, type }) {
  const headTitle = `Sản phẩm ${type} | Brother Shop`;

  return (
    <PageContainer barTitle={type} headTitle={headTitle}>
      <Products products={products} />
    </PageContainer>
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
