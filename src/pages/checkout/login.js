import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import ConfirmNotLogin from '@/modules/auth/components/ConfirmNotLogin';
import LoginForm from '@/modules/auth/components/LoginForm';
import { Container, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import Head from 'next/head';

function CheckoutLogin() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">
        <BuySteppers activeStep={1} />
        <Title sx={{ ml: { xs: 3, xl: 0 } }}>Đăng Nhập</Title>
        <div className="px-[5%] xl:px-0">
          <Grid container spacing={3} sx={{ mt: '20px', mb: 4 }}>
            <Grid item xs={12} md={6} sx={{ pr: 2 }}>
              <LoginForm />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mr: '-1px', backgroundColor: theme.palette.grey['900'] }} />
            <Grid item xs={12} md={6}>
              <ConfirmNotLogin />
            </Grid>
          </Grid>
        </div>
      </NavigationLayout>
    </>
  );
}

export default CheckoutLogin;
