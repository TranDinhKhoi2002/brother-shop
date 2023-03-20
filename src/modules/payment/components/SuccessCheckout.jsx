import Button from '@/common/components/UI/Button';
import BuySteppers from '@/common/components/UI/BuySteppers';
import Title from '@/common/components/UI/Title';
import { checkOut } from '@/redux/slices/cart';
import { checkOutOrder } from '@/services/orderRequests';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { createDecipher } from 'crypto';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function SuccessCheckout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { name, email } = router.query;
  const theme = useTheme();

  useEffect(() => {
    const updateOrder = async () => {
      const encryptedOrderId = localStorage.getItem('encryptedOrderId');
      const encryptedBytes = Buffer.from(encryptedOrderId, 'base64');

      const decipher = createDecipher('aes-256-cbc', 'secret');
      let decrypted = decipher.update(encryptedBytes);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      const decryptedString = decrypted.toString();

      if (router.query.vnp_ResponseCode === '00') {
        await checkOutOrder(decryptedString);
      }

      dispatch(checkOut());
    };

    updateOrder();
  }, [router.query.vnp_ResponseCode, dispatch]);

  return (
    <>
      <BuySteppers activeStep={3} />
      <Title sx={{ textAlign: 'center' }}>ĐẶT HÀNG THÀNH CÔNG</Title>
      <Image src={`/assets/images/cod.svg`} alt="" width={120} height={120} className="mx-auto my-10" />
      <Box sx={{ textAlign: 'center' }}>
        <Box
          component="span"
          sx={{
            paddingX: 3,
            paddingY: '8px',
            backgroundColor: theme.palette.grey['900'],
            borderRadius: '8px',
            color: 'white',
          }}
        >
          Mã đơn hàng: 123456
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: '12px' }}>Cảm ơn Quý khách {name} đã mua hàng trên Brother Shop!</Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị ảnh hưởng bởi những tình huống bất khả
            kháng: thiên tai, bão lũ...). Brother Shop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
          </Typography>
          <Typography>Rất mong quý khách hàng thông cảm!</Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email{' '}
            <strong>{email}</strong>
          </Typography>
          <Typography sx={{ width: { md: '85%', lg: '80%', xl: '65%' }, mx: 'auto', mb: '12px', px: '12px' }}>
            Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho Người
            nhận luôn bật điện thoại để nhận liên lạc từ nhân viên giao hàng của Brother Shop
          </Typography>
          <Link href="/">
            <Button className="px-10 mb-8">Trở về trang chủ</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SuccessCheckout;
