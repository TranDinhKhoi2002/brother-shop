import PageContainer from '@/common/components/Layout/PageContainer';
import Button from '@/common/components/UI/Button';
import Title from '@/common/components/UI/Title';
import { MOST_SEARCHEED } from '@/constants';
import Products from '@/modules/product/components/Products';
import NoSearchResult from '@/modules/search/NoSearchResult';
import { getProductsByKeyword } from '@/services/productRequests';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

function SearchPage({ loadedProducts, keyword, lastPage }) {
  const [products, setProducts] = useState(loadedProducts);
  const [maxPage, setMaxPage] = useState(lastPage);

  const searchInputRef = useRef();

  const handlePageChange = async (e, page) => {
    await getProducts(page);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await getProducts();
  };

  const handleSelectTag = async (tag) => {
    searchInputRef.current.value = tag;
    await getProducts();
  };

  const getProducts = async (page) => {
    try {
      const { products, lastPage } = await getProductsByKeyword(searchInputRef.current.value, page);

      setMaxPage(lastPage);
      setProducts(products);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  return (
    <PageContainer barTitle="Tìm kiếm sản phẩm" headTitle="Tìm kiếm sản phẩm">
      <div className="mt-3 px-4 xl:px-0">
        <form className="grid grid-cols-6 gap-2 xsm:gap-7">
          <input
            ref={searchInputRef}
            defaultValue={keyword}
            className="col-span-5 h-[43px] w-full py-[0.375rem] px-3 text-base font-normal text-[#495057] outline-none border-[1px] border-solid border-[#ced4da] focus:border-[#ee4266] rounded-[0.25rem] transition duration-150 "
            placeholder="Từ khóa"
            autoFocus
            spellCheck={false}
          />
          <button
            onClick={handleSearch}
            className="col-span-1 text-[13px] text-white bg-[#17a2b8] border-[1px] border-solid border-[#17a2b8] rounded-[0.25rem] font-medium"
          >
            TÌM
          </button>
        </form>
      </div>

      {products.length > 0 && (
        <>
          <Typography sx={{ textAlign: 'center', my: 4, fontSize: 16, fontWeight: 400 }}>
            Kết quả tìm kiếm cho từ khóa &quot;<strong>{searchInputRef.current?.value || keyword}</strong>&quot;
          </Typography>
          <Box sx={{ px: { xs: 2, xl: 0 } }}>
            <Typography sx={{ fontSize: 18, fontWeight: 400 }}>Được tìm kiếm nhiều:</Typography>
            <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
              {MOST_SEARCHEED.map((item) => (
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
            <Pagination count={maxPage} color="primary" onChange={handlePageChange} />
          </Stack>
        </>
      )}

      {products.length === 0 && <NoSearchResult keyword={searchInputRef.current?.value || keyword} />}
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const { keyword } = context.query;
  const { products, lastPage } = await getProductsByKeyword(keyword);

  return {
    props: {
      loadedProducts: products,
      keyword,
      lastPage,
    },
  };
}

export default SearchPage;
