import { ReactElement } from 'react';
import Button from '@/common/components/Buttons/Button';
import config from '@/config';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { add } from '@/redux/slices/breadcrumb';

function ConfirmNotLogin(): ReactElement {
  const dispatch = useAppDispatch();

  const handleUpdateBreadcrumb = () => {
    dispatch(
      add({ item: { id: 'checkout/shipping', url: config.routes.checkoutShipping, name: 'Thông tin đặt hàng' } }),
    );
  };

  return (
    <>
      <Typography sx={{ display: { xs: 'block', md: 'none' }, my: 4, textAlign: 'center' }}>Hoặc</Typography>
      <Box>
        <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
          Mua hàng không cần đăng nhập
        </Typography>
        <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>
          Chào mừng! Bạn không cần tạo tài khoản để đặt hàng
        </Typography>
        <Box sx={{ textAlign: 'center', my: '20px' }}>
          <Link href={config.routes.checkoutShipping} onClick={() => handleUpdateBreadcrumb()}>
            <Button>Xác nhận mua hàng không đăng nhập</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default ConfirmNotLogin;
