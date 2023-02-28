import Button from '@/common/components/UI/Button';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SuccessCheckout() {
  const router = useRouter();
  const { name, email } = router.query;

  return (
    <>
      <BuySteppers activeStep={4} />
      <Title className="!text-2xl md:text-3xl text-center mt-14">ĐẶT HÀNG THÀNH CÔNG</Title>
      <Image src={`/assets/images/cod.svg`} alt="" width={120} height={120} className="mx-auto my-10" />
      <div className="text-center">
        <span className="px-6 py-2 bg-[#000] rounded-lg text-white mx-auto">Mã đơn hàng: 123456</span>
        <div className="mt-8">
          <p className="mb-3">Cảm ơn Quý khách {name} đã mua hàng trên Brother Shop!</p>
          <p className="xl:w-[65%] lg:w-[80%] md:w-[85%] mx-auto mb-3 px-3">
            Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị ảnh hưởng bởi những tình huống bất khả
            kháng: thiên tai, bão lũ...). Brother Shop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
          </p>
          <p>Rất mong quý khách hàng thông cảm!</p>
          <p className="xl:w-[65%] lg:w-[80%] md:w-[85%] mx-auto mb-3 px-3">
            Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email{' '}
            <strong>{email}</strong>
          </p>
          <p className="xl:w-[65%] lg:w-[80%] md:w-[85%] mx-auto mb-3 px-3">
            Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho Người
            nhận luôn bật điện thoại để nhận liên lạc từ nhân viên giao hàng của Brother Shop
          </p>
          <Link href="/">
            <Button className="px-10 mb-8">Trở về trang chủ</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SuccessCheckout;
