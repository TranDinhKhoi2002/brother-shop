import { addToCart } from '@/redux/slices/cart';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import GeneralInfor from './Generalnfor';
import GuidanceSize from './GuidanceSize';
import PreviewImages from './PreviewImages';
import TableSize from './TableSize';

function ProductInfor({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = (size) => {
    dispatch(addToCart({ product, size }));
  };

  return (
    <Grid container spacing={3} sx={{ mt: '12px' }}>
      <Grid item xs={12} md={4}>
        <PreviewImages images={product.images} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ px: 2 }}>
              <GeneralInfor
                name={product.name}
                id={product._id.slice(0, 8).toUpperCase()}
                price={product.price}
                oldPrice={product.oldPrice}
              />
              <TableSize onAddToCart={addToCartHandler} product={product} />
              <GuidanceSize />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ mb: 5 }}>
            <Box sx={{ px: 2 }}>
              <Typography sx={{ fontSize: '1.5rem', my: '12px' }}>Mô tả sản phẩm</Typography>
              <Typography>{product.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductInfor;
