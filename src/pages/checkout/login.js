import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import ConfirmNotLogin from '@/modules/auth/components/ConfirmNotLogin';
import LoginForm from '@/modules/auth/components/LoginForm';
import Head from 'next/head';

function CheckoutLogin() {
  return (
    <>
      <Head>
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">
        <BuySteppers activeStep={1} />
        <Title className="ml-8">Đăng Nhập</Title>
        <div className="md:grid grid-cols-2 gap-5 px-[5%] xl:px-0 mt-5 mb-10">
          <LoginForm />
          <ConfirmNotLogin />
        </div>
      </NavigationLayout>
    </>
  );
}

export default CheckoutLogin;
