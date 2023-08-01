import { Box, Grid, Skeleton } from '@mui/material';

function ProductsSkeleton() {
  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {[...Array(8)].map((_, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}>
            <Skeleton variant="rounded" animation="wave" width={'100%'} height={'420px'} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductsSkeleton;
