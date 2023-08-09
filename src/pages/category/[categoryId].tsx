import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import CategoryFilter from '@/modules/filter/components';
import { getCategories } from '@/services/categoryRequests';
import { getProductsByCategory } from '@/services/productRequests';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import PageContainer from '@/common/components/Layout/PageContainer';
import { Container } from '@mui/material';

interface IGetStaticProps {
  products: Product[];
  categoryName: string;
}

function ProductType({ products, categoryName }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const headTitle = `Dòng sản phẩm ${categoryName} | Brother Shop`;

  return (
    <PageContainer barTitle={categoryName} headTitle={headTitle}>
      <Container maxWidth={false}>
        <CategoryFilter loadedProducts={products} categoryName={categoryName} />
      </Container>
    </PageContainer>
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
