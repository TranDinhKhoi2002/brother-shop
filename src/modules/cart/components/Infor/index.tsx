import BuySteppers from '@/common/components/UI/BuySteppers';
import { Container, Grid } from '@mui/material';
import DetailCart from '../Detail';
import OrderForm from '../../../payment/components/OrderForm';

function CartInfor() {
  return (
    <>
      <BuySteppers activeStep={1} />
      <Container maxWidth={false}>
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
