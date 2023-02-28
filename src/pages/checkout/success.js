import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import SuccessCheckout from '@/modules/payment/components/SuccessCheckout';
import Head from 'next/head';

function CheckoutSuccessPage() {
  return (
    <>
      <Head>
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">
        <SuccessCheckout />
      </NavigationLayout>
    </>
  );
}

export default CheckoutSuccessPage;
