import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import CategoryFilter from '@/modules/filter/components';
import { getCategories } from '@/services/categoryRequests';
import { getProductsByCategory } from '@/services/productRequests';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

interface IGetStaticProps {
  products: Product[];
  categoryName: string;
}

function ProductType({ products, categoryName }: InferGetStaticPropsType<typeof getStaticProps>) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: Category[] = await getCategories();
  const categoryPaths = categories.map((category) => ({ params: { categoryId: category._id } }));

  return {
    paths: categoryPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryId = params?.categoryId as string;
  const { products, categoryName }: IGetStaticProps = await getProductsByCategory(categoryId);

  return {
    props: { products, categoryName },
  };
};

export default ProductType;
