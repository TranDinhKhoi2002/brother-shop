import Button from '@/common/components/UI/Button';
import Image from 'next/image';
import Link from 'next/link';

function EmptyCart() {
  return (
    <div className="text-center my-6">
      <h3 className="text-2xl font-medium">Bạn chưa chọn sản phẩm.</h3>
      <div>
        <Image
          src={'/assets/images/no-product.png'}
          width={300}
          height={300}
          alt="Giỏ hàng trống"
          className="mx-auto"
        />
      </div>
      <p>Hãy nhanh tay chọn ngay sản phẩm yêu thích.</p>
      <Link href={'/'}>
        <Button className="my-4">Tiếp tục mua hàng</Button>
      </Link>
    </div>
  );
}

export default EmptyCart;
