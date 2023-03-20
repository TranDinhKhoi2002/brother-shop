import PageContainer from '@/common/components/Layout/PageContainer';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import ConfirmNotLogin from '@/modules/auth/components/ConfirmNotLogin';
import LoginForm from '@/modules/auth/components/LoginForm';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import { selectCartProducts } from '@/redux/slices/cart';
import { Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';

function CheckoutLogin() {
  const theme = useTheme();
  const cartProducts = useSelector(selectCartProducts);

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <BuySteppers activeStep={0} />
          <Title sx={{ ml: { xs: 3, xl: 0 } }}>Đăng Nhập</Title>
          <div className="px-[5%] xl:px-0">
            <Grid container spacing={3} sx={{ mt: '20px', mb: 4 }}>
              <Grid item xs={12} md={6} sx={{ pr: 2 }}>
                <LoginForm />
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mr: '-1px', backgroundColor: theme.palette.grey['900'] }}
              />
              <Grid item xs={12} md={6}>
                <ConfirmNotLogin />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </PageContainer>
  );
}

export default CheckoutLogin;
