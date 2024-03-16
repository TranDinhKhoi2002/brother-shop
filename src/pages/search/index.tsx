/* eslint-disable max-len */
import { useRouter } from 'next/router';
import PageContainer from '@/common/components/Layout/PageContainer';
import { getProductsByKeyword } from '@/services/product';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Product } from '@/types/product';
import config from '@/config';
import ProductsSkeleton from '@/common/components/Skeleton/Products';
import SearchResults from '@/modules/search/Result';
import SearchForm from '@/modules/search/Form';
import index from '@/utils/lib/algolia';
import { mapProductsToView } from '@/utils/product';
import { Container } from '@mui/material';

interface IGetStaticProps {
  products: Product[];
  lastPage: number;
}

function SearchPage({
  loadedProducts,
  keyword,
  lastPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const [products, setProducts] = useState<any[]>(loadedProducts);
  const [maxPage, setMaxPage] = useState<number>(lastPage);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const {
          hits,
          page: searchPage,
          nbPages: searchTotalPage,
        } = await index.search(router.query.keyword as string, {
          page: router.query.page ? +router.query.page - 1 : 0,
        });

        setMaxPage(searchTotalPage);
        setPage(searchPage + 1);
        setProducts(mapProductsToView(hits));
      } catch (error) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router.query.keyword, router.query.page]);

  const handleSelectTag = async (tag: string) => {
    if (searchInputRef?.current) {
      searchInputRef!.current!.value = tag;
    }
    router.replace({ pathname: config.routes.search, query: { keyword: tag } });
  };

  return (
    <PageContainer barTitle="Tìm kiếm sản phẩm" headTitle="Tìm kiếm sản phẩm">
      <Container maxWidth={false}>
        <SearchForm />
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <SearchResults
            products={products}
            keyword={keyword}
            maxPage={maxPage}
            page={page}
            onSelectTag={handleSelectTag}
          />
        )}
      </Container>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { keyword } = context.query;
  const { products, lastPage }: IGetStaticProps = await getProductsByKeyword(keyword as string, 1);

  return {
    props: {
      loadedProducts: products,
      keyword,
      lastPage,
    },
  };
};

export default SearchPage;
