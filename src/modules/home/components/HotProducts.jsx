import Products from '@/modules/product/components/Products';
import { Box, Typography } from '@mui/material';

function HotProducts({ products }) {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ pt: 5, pb: 1, fontSize: '1.5rem' }} variant="body2">
          Top sản phẩm HOT
        </Typography>
        <Typography sx={{ fontWeight: 'light' }}>Những sản phẩm thời trang mới nhất/Hot nhất</Typography>
      </Box>
      <Products products={products} />
    </>
  );
}

export default HotProducts;
