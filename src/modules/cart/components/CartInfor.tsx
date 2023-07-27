import { ReactElement } from 'react';
import BuySteppers from '@/common/components/UI/BuySteppers';
import { Container, Grid } from '@mui/material';
import DetailCart from './DetailCart';
import OrderForm from '../../payment/components/OrderForm';

function CartInfor(): ReactElement {
  return (
    <>
      <BuySteppers activeStep={1} />
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mt: '20px', mb: 4 }}>
          <Grid item xs={12} md={6}>
            <DetailCart />
          </Grid>
          <Grid item xs={12} md={6}>
            <OrderForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CartInfor;
