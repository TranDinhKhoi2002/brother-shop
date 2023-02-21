import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import ProductInfor from '@/modules/product/components/ProductInfor';
import RelatedProducts from '@/modules/product/components/RelatedProducts';
import { getAllProducts, getProductById, getProductsByType } from '@/services/productRequests';
import Head from 'next/head';

function ProductInforPage({ product, relatedProducts }) {
  const headTitle = `Sản phẩm ${product.name} | Brother Shop`;
  console.log(relatedProducts);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavigationLayout title={product.name}>
        <ProductInfor product={product} />
        <RelatedProducts products={relatedProducts} />
      </NavigationLayout>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const productIds = products.map((product) => ({ params: { productId: product._id } }));

  return {
    paths: productIds,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);

  const type = product.name.split(' ')[0];
  const relatedProducts = await getProductsByType(type);

  return {
    props: {
      product,
      relatedProducts,
    },
  };
}

export default ProductInforPage;
