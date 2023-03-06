import Image from 'next/image';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import Button from '@/common/components/UI/Button';
import Link from 'next/link';

function FailedCheckout() {
  return (
    <>
      <BuySteppers activeStep={4} />
      <Title className="!text-2xl md:text-3xl text-center mt-14">ĐÃ HỦY ĐƠN HÀNG</Title>
      <Image src={`/assets/images/pay-card.svg`} alt="" width={120} height={120} className="mx-auto my-10" />
      <div className="text-center px-3">
        <p>Đơn hàng đã bị hủy vì quý khách đã hủy giao dịch</p>
        <p>Quý khách vui lòng thực hiện lại thanh toán để hoàn tất đặt hàng</p>
        <p>Chân thành cảm ơn quý khách đã tin tưởng Brother Shop</p>
        <Link href="/checkout/shipping">
          <Button className="px-10 mb-8 mt-3">Thanh toán lại</Button>
        </Link>
      </div>
    </>
  );
}

export default FailedCheckout;
