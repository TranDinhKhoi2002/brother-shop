import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import Products from '@/modules/product/components/Products';
import { getCategories } from '@/services/categoryRequests';
import { getProductsByCategory } from '@/services/productRequests';
import Head from 'next/head';
import { useRouter } from 'next/router';

function ProductType({ products }) {
  const router = useRouter();
  const { title } = router.query;
  const headTitle = `Dòng sản phẩm ${title} | Brother Shop`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavigationLayout title={title}>
        <Products products={products} />
      </NavigationLayout>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const categoryPaths = categories.map((category) => ({ params: { categoryId: category._id } }));

  return {
    paths: categoryPaths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const categoryId = context.params.categoryId;
  const products = await getProductsByCategory(categoryId);

  return {
    props: { products },
  };
}

export default ProductType;
