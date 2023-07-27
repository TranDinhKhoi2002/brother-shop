import Button from '@/common/components/Buttons/Button';
import Products from '@/modules/product/components/Products';
import { Product } from '@/types/product';
import { Box } from '@mui/material';
import { ReactElement } from 'react';

type ProductsOfTypeProps<T> = {
  products: Product[];
  keyword: T;
  onSeeMore: (_keyword: T) => void;
};

function ProductsOfType({ products, keyword, onSeeMore }: ProductsOfTypeProps<string>): ReactElement {
  return (
    <>
      <Products products={products} />
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Button onClick={() => onSeeMore(keyword)}>Xem tất cả {keyword.toLowerCase()}</Button>
      </Box>
    </>
  );
}

export default ProductsOfType;
