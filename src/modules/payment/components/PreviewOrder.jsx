import Link from 'next/link';
import { Card, CardActions, CardContent, Divider } from '@mui/material';

import Title from '@/common/components/UI/Title';
import Button from '@/common/components/UI/Button';
import { printNumberWithCommas } from '@/utils/printPriceWithComma';

function PreviewOrder({ cartProducts, totalPrice, shippingPrice, onPay }) {
  return (
    <Card>
      <CardContent>
        <Title>Đơn hàng của bạn</Title>
        <Divider sx={{ marginY: '12px', marginX: 2 }} />
        <div className="flex justify-between items-center">
          <span className="font-medium">Sản phẩm</span>
          <span className="font-medium">Thành tiền</span>
        </div>
        <ul>
          {cartProducts.map((cartProduct) => (
            <li key={`${cartProduct.product._id}-${cartProduct.size}`} className="my-2">
              <div className="flex justify-between gap-8">
                <span>
                  {cartProduct.amount} X{' '}
                  <Link
                    href={`/shop/products/${cartProduct.product._id}`}
                    className="hover:text-[#0056b3] transition duration-300"
                  >
                    {cartProduct.product.name}
                  </Link>{' '}
                  - {cartProduct.size}
                </span>
                <span>{printNumberWithCommas(cartProduct.product.price * cartProduct.amount)}đ</span>
              </div>
            </li>
          ))}
        </ul>

        <Divider sx={{ marginY: 2 }} orientation="horizontal" />
        <div className="flex justify-between items-center my-1">
          <span>Phí vận chuyển</span>
          <span>{printNumberWithCommas(shippingPrice)}đ</span>
        </div>
        <div className="flex justify-between items-center my-1">
          <span>Tổng thanh toán</span>
          <span className="font-medium text-lg">{printNumberWithCommas(totalPrice)}đ</span>
        </div>

        <CardActions>
          <Button className="w-full my-3" onClick={onPay} name="redirect">
            Thanh toán
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PreviewOrder;
