import Products from '@/modules/product/components/Products';
import { Box, Typography } from '@mui/material';

function SaleOffProducts({ products }) {
  return (
    <>
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Typography sx={{ pt: 5, pb: 1, fontSize: '1.5rem' }} variant="body2">
          Các sản phẩm giảm giá
        </Typography>
        <Typography sx={{ fontWeight: 'light' }}>Đừng bỏ lỡ - Hãy mua ngay</Typography>
      </Box>
      <Products products={products} />
    </>
  );
}

export default SaleOffProducts;
