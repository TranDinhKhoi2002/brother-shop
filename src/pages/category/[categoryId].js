import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import CategoryFilter from '@/modules/filter/components';
import { getCategories } from '@/services/categoryRequests';
import { getProductsByCategory } from '@/services/productRequests';
import Head from 'next/head';
import { useRouter } from 'next/router';

function ProductType({ products, categoryName }) {
  const router = useRouter();
  const headTitle = `Dòng sản phẩm ${categoryName} | Brother Shop`;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavigationLayout title={categoryName}>
        <CategoryFilter loadedProducts={products} categoryName={categoryName} />
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
  const { products, categoryName } = await getProductsByCategory(categoryId);

  return {
    props: { products, categoryName },
  };
}

export default ProductType;
