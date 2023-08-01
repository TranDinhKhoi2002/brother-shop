import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import ProductInfor from '@/modules/product/components/ProductInfor';
import RelatedProducts from '@/modules/product/components/RelatedProducts';
import { getAllProducts, getProductById, getProductsByType } from '@/services/productRequests';
import { Product } from '@/types/product';

function ProductInforPage({ product, relatedProducts }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const headTitle = `Sản phẩm ${product.name} | Brother Shop`;

  return (
    <PageContainer barTitle={product.name} headTitle={headTitle}>
      <Container maxWidth={false}>
        <ProductInfor product={product} />
        <RelatedProducts products={relatedProducts} />
      </Container>
    </PageContainer>
  );
}

export async function getStaticPaths() {
  const products: Product[] = await getAllProducts();
  const productIds = products.map((product) => ({ params: { productId: product._id } }));

  return {
    paths: productIds,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const productId = context?.params?.productId as string;
  const product: Product = await getProductById(productId);

  const type = product.name.split(' ')[0];
  const relatedProducts: Product[] = await getProductsByType(type);

  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 5,
  };
};

export default ProductInforPage;
