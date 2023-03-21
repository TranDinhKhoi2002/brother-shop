import Link from 'next/link';
import { Card, CardActions, CardContent, Divider, Stack, Typography } from '@mui/material';

import Title from '@/common/components/UI/Title';
import Button from '@/common/components/UI/Button';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';

function PreviewOrder({ cartProducts, totalPrice, shippingPrice, onPay }) {
  return (
    <Card>
      <CardContent>
        <Title>Đơn hàng của bạn</Title>
        <Divider sx={{ marginY: '12px' }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 500 }}>Sản phẩm</Typography>
          <Typography sx={{ fontWeight: 500 }}>Thành tiền</Typography>
        </Stack>
        <ul>
          {cartProducts.map((cartProduct) => (
            <li key={`${cartProduct.productId._id}-${cartProduct.size}`} className="my-2">
              <div className="flex justify-between gap-8">
                <span>
                  {cartProduct.quantity} X{' '}
                  <Link
                    href={`/shop/products/${cartProduct.productId._id}`}
                    className="hover:text-[#0056b3] transition duration-300"
                  >
                    {cartProduct.productId.name}
                  </Link>{' '}
                  - {cartProduct.size}
                </span>
                <span>{printNumberWithCommas(cartProduct.productId.price * cartProduct.quantity)}đ</span>
              </div>
            </li>
          ))}
        </ul>

        <Divider sx={{ marginY: 2 }} orientation="horizontal" />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: '4px' }}>
          <Typography>Phí vận chuyển</Typography>
          <Typography>{printNumberWithCommas(shippingPrice)}đ</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: '4px' }}>
          <Typography>Tổng thanh toán</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>{printNumberWithCommas(totalPrice)}đ</Typography>
        </Stack>

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
