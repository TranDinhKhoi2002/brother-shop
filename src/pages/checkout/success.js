import Head from 'next/head';
import { useRouter } from 'next/router';
import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import SuccessCheckout from '@/modules/payment/components/SuccessCheckout';
import FailedCheckout from '@/modules/payment/components/FailedCheckout';

function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">
        {router.query.vnp_ResponseCode && router.query.vnp_ResponseCode !== '00' ? (
          <FailedCheckout />
        ) : (
          <SuccessCheckout />
        )}
      </NavigationLayout>
    </>
  );
}

export default CheckoutSuccessPage;
