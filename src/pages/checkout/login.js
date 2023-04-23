import PageContainer from '@/common/components/Layout/PageContainer';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import config from '@/config';
import ConfirmNotLogin from '@/modules/auth/components/ConfirmNotLogin';
import LoginForm from '@/modules/auth/components/LoginForm';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import { selectCartProducts } from '@/redux/slices/cart';
import { Container, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function CheckoutLogin() {
  const theme = useTheme();
  const cartProducts = useSelector(selectCartProducts);

  const router = useRouter();

  const handleLogin = () => {
    router.push(config.routes.checkoutShipping);
  };

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <BuySteppers activeStep={0} />
          <Title sx={{ ml: { xs: 3, xl: 0 } }}>Đăng Nhập</Title>
          <Container maxWidth="xxl">
            <Grid container spacing={3} sx={{ mt: '20px', mb: 4 }}>
              <Grid item xs={12} md={6} sx={{ pr: 2 }}>
                <LoginForm onLogin={handleLogin} />
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
          </Container>
        </>
      )}
    </PageContainer>
  );
}

export default CheckoutLogin;
