import Button from '@/common/components/UI/Button';
import { calculateTotalCart } from '@/common/utility/calculateTotalCart';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import config from '@/config';
import { TRANSPORTATION_COST } from '@/constants';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { selectCartProducts } from '@/redux/slices/cart';
import { Card, CardContent, Divider, Stack, Typography, Button as ButtonMUI } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';

function PreviewInvoice() {
  const cartProducts = useSelector(selectCartProducts);
  const totalCart = calculateTotalCart(cartProducts);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Stack direction="row" justifyContent="flex-end">
      <Card sx={{ width: { xs: '100%', md: '400px' }, mt: 4, mb: 6 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18, fontWeight: 600, textTransform: 'uppercase', mb: 3 }}>Tạm tính</Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 1 }}>
            <Typography sx={{ fontWeight: 400 }}>Thành tiền</Typography>
            <Typography>{printNumberWithCommas(totalCart)} đ</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 1 }}>
            <Typography sx={{ fontWeight: 400 }}>Phí vận chuyển</Typography>
            <Typography>{printNumberWithCommas(TRANSPORTATION_COST)} đ</Typography>
          </Stack>
          <Divider sx={{ marginY: 3 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 1 }}>
            <Typography sx={{ fontWeight: 400 }}>Tổng tiền</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 22 }}>
              {printNumberWithCommas(totalCart + TRANSPORTATION_COST)} đ
            </Typography>
          </Stack>
          <Link href={isAuthenticated ? config.routes.checkoutShipping : config.routes.checkoutLogin}>
            <Button className="w-full mt-4">Thanh toán</Button>
          </Link>
          <Link href="/">
            <ButtonMUI sx={{ textTransform: 'uppercase', mt: 2, py: '12px' }} fullWidth>
              Tiếp tục mua hàng
            </ButtonMUI>
          </Link>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PreviewInvoice;
