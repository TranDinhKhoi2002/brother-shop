import Button from '@/common/components/Buttons/Button';
import { selectCurrentUser } from '@/redux/slices/auth';
import { Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PurchaseHistoryTable from '../PurchaseHistoryTable';

function PurchaseHistoryTab() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Box>
      <Typography variant="h5">Lịch sử mua hàng</Typography>
      <Typography variant="body1" sx={{ mt: '6px' }}>
        Bạn có thể xem lịch sử mua hàng và trạng thái đơn hàng tại đây.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {currentUser?.orders?.length === 0 ? (
        <Stack direction="column" alignItems="center">
          <Typography variant="h6">Bạn chưa có đơn hàng nào</Typography>
          <Image src="/assets/images/empty-order.png" width={200} height={200} alt="Không có lịch sử mua hàng" />
          <Link href="/">
            <Button className="px-12">Mua sắm ngay</Button>
          </Link>
        </Stack>
      ) : (
        <PurchaseHistoryTable orders={currentUser?.orders || []} />
      )}
    </Box>
  );
}

export default PurchaseHistoryTab;
