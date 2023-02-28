import Button from '@/common/components/UI/Button';
import Link from 'next/link';

function ConfirmNotLogin() {
  return (
    <>
      <p className="block md:hidden my-8 text-center">Hoặc</p>
      <div className="md:border-l-[1px]">
        <h5 className="text-center font-medium text-xl my-3">Mua hàng không cần đăng nhập</h5>
        <p className="text-center">Chào mừng! Bạn không cần tạo tài khoản để đặt hàng</p>
        <div className="text-center my-5">
          <Link href="/checkout/shipping">
            <Button>Xác nhận mua hàng không đăng nhập</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ConfirmNotLogin;
