import { ReactElement, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import CategoryFilter from '@/modules/filter/components';
import { getCategories } from '@/services/categoryRequests';
import { getProductsByCategory } from '@/services/productRequests';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import PageContainer from '@/common/components/Layout/PageContainer';
import { Container } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';

interface IGetStaticProps {
  products: Product[];
  categoryName: string;
}

function ProductType({ products, categoryName }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const headTitle = `Dòng sản phẩm ${categoryName} | Brother Shop`;

  useEffect(() => {
    dispatch(
      updateBrandNewBreadcrumb({
        item: {
          id: `category/${router.query.categoryId}`,
          url: `/category/${router.query.categoryId}`,
          name: categoryName,
        },
      }),
    );
  }, [categoryName, dispatch, router.query.categoryId]);

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
