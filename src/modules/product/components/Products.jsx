import { Box, Grid } from '@mui/material';
import ProductItem from './ProductItem';

function Products({ products, forDetail }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container>
        {products.map((product, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <ProductItem forDetail={forDetail} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
