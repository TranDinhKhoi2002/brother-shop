/* eslint-disable max-len */
import { useRouter } from 'next/router';
import PageContainer from '@/common/components/Layout/PageContainer';
import Button from '@/common/components/Buttons/Button';
import { MOST_SEARCHED } from '@/constants';
import Products from '@/modules/product/components/Products';
import NoSearchResult from '@/modules/search/NoSearchResult';
import { getProductsByKeyword } from '@/services/productRequests';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Product } from '@/types/product';
import config from '@/config';
import ProductsSkeleton from '@/common/components/Skeleton/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';

interface IGetStaticProps {
  products: Product[];
  lastPage: number;
}

function SearchPage({
  loadedProducts,
  keyword,
  lastPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const [products, setProducts] = useState<Product[]>(loadedProducts);
  const [maxPage, setMaxPage] = useState<number>(lastPage);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts(router.query.page ? +router.query.page : 1);
  }, [router.query.keyword, router.query.page]);

  useEffect(() => {
    dispatch(
      updateBrandNewBreadcrumb({ item: { id: 'search', url: config.routes.search, name: 'Tìm kiếm sản phẩm' } }),
    );
  }, [dispatch]);

  const handlePageChange = async (_: any, page: number) => {
    router.replace({ pathname: config.routes.search, query: { keyword: searchInputRef!.current!.value, page } });
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace({ pathname: config.routes.search, query: { keyword: searchInputRef!.current!.value } });
  };

  const handleSelectTag = async (tag: string) => {
    searchInputRef!.current!.value = tag;
    router.replace({ pathname: config.routes.search, query: { keyword: tag } });
  };

  const getProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      const { products, lastPage } = await getProductsByKeyword(searchInputRef!.current!.value, page);

      setMaxPage(lastPage);
      setPage(page);
      setProducts(products);
      setLoading(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const renderSearchResult = (): ReactElement => {
    if (products && products.length > 0) {
      return (
        <>
          <Typography sx={{ textAlign: 'center', my: 4, fontSize: 16, fontWeight: 400 }}>
            Kết quả tìm kiếm cho từ khóa &quot;<strong>{searchInputRef.current?.value || keyword}</strong>&quot;
          </Typography>
          <Box sx={{ px: { xs: 2, xl: 0 } }}>
            <Typography sx={{ fontSize: 18, fontWeight: 400 }}>Được tìm kiếm nhiều:</Typography>
            <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
              {MOST_SEARCHED.map((item) => (
                <Grid item key={item}>
                  <Button className="px-4 py-1 rounded-xl lowercase" onClick={() => handleSelectTag(item)}>
                    {item}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Products products={products} />
          <Stack direction="row" justifyContent="center" sx={{ my: 6 }}>
            <Pagination count={maxPage} page={page} color="primary" onChange={handlePageChange} />
          </Stack>
        </>
      );
    }

    return <NoSearchResult keyword={searchInputRef.current?.value || keyword} />;
  };

  return (
    <PageContainer barTitle="Tìm kiếm sản phẩm" headTitle="Tìm kiếm sản phẩm">
      <>
        <div className="mt-3 px-4 xl:px-0">
          <form className="grid grid-cols-6 gap-2 xsm:gap-2" onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              defaultValue={keyword}
              className="col-span-5 h-[43px] w-full py-[0.375rem] px-3 text-base font-normal text-[#495057] outline-none border-[1px] border-solid border-[#ced4da] focus:border-[#ee4266] rounded-[0.25rem] transition duration-150 "
              placeholder="Từ khóa"
              autoFocus
              spellCheck={false}
            />
            <button
              type="submit"
              className="col-span-1 text-[13px] text-white bg-[#17a2b8] border-[1px] border-solid border-[#17a2b8] rounded-[0.25rem] font-medium"
            >
              TÌM
            </button>
          </form>
        </div>

        {loading ? <ProductsSkeleton /> : renderSearchResult()}
      </>
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
