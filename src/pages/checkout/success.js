import { useRouter } from 'next/router';
import SuccessCheckout from '@/modules/payment/components/SuccessCheckout';
import FailedCheckout from '@/modules/payment/components/FailedCheckout';
import PageContainer from '@/common/components/Layout/PageContainer';

function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      {router.query.vnp_ResponseCode && router.query.vnp_ResponseCode !== '00' ? (
        <FailedCheckout />
      ) : (
        <SuccessCheckout />
      )}
    </PageContainer>
  );
}

export default CheckoutSuccessPage;
