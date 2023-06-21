import Button from '@/common/components/Buttons/Button';
import Products from '@/modules/product/components/Products';
import { Box } from '@mui/material';

function ProductsOfType({ products, onSeeMore, keyword }) {
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
