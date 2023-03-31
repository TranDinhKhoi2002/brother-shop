import BuySteppers from '@/common/components/UI/BuySteppers';
import { Grid } from '@mui/material';
import DetailCart from './DetailCart';
import OrderForm from './OrderForm';

function CartInfor() {
  return (
    <>
      <BuySteppers activeStep={1} />
      <div className="px-[5%] xl:px-0">
        <Grid container spacing={4} sx={{ mt: '20px', mb: 4 }}>
          <Grid item xs={12} md={6}>
            <DetailCart />
          </Grid>
          <Grid item xs={12} md={6}>
            <OrderForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CartInfor;
