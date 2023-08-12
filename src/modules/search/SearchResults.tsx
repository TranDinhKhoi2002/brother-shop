import { MOST_SEARCHED } from '@/constants';
import { Product } from '@/types/product';
import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import Products from '../product/components/Products';
import { ReactElement, RefObject } from 'react';
import NoSearchResult from './NoSearchResult';

type SearchResultsProps = {
  products: Product[];
  inputRef: RefObject<HTMLInputElement>;
  keyword: string;
  maxPage: number;
  page: number;
  onSelectTag: (_tag: string) => Promise<void>;
  onPageChange: (_: any, _page: number) => Promise<void>;
};

function SearchResults({
  products,
  inputRef,
  keyword,
  maxPage,
  page,
  onSelectTag,
  onPageChange,
}: SearchResultsProps): ReactElement {
  if (products && products.length > 0) {
    return (
      <>
        <Typography sx={{ textAlign: 'center', my: 4, fontSize: 16, fontWeight: 400 }}>
          Kết quả tìm kiếm cho từ khóa &quot;<strong>{inputRef.current?.value || keyword}</strong>&quot;
        </Typography>
        <Box sx={{ px: { xs: 2, xl: 0 } }}>
          <Typography sx={{ fontSize: 18, fontWeight: 400 }}>Được tìm kiếm nhiều:</Typography>
          <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
            {MOST_SEARCHED.map((item) => (
              <Grid item key={item}>
                <Button className="px-4 py-1 rounded-xl lowercase" onClick={() => onSelectTag(item)}>
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Products products={products} />
        <Stack direction="row" justifyContent="center" sx={{ my: 6 }}>
          <Pagination count={maxPage} page={page} color="primary" onChange={onPageChange} />
        </Stack>
      </>
    );
  }

  return <NoSearchResult keyword={inputRef.current?.value || keyword} />;
}

export default SearchResults;
