import { appAssets } from '@/common/assets';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

function NoSearchResult({ keyword }) {
  return (
    <Box sx={{ textAlign: 'center', my: 6 }}>
      <Image src={appAssets.hangerIcon} width={60} height={60} style={{ margin: '0 auto' }} alt="" />
      <Typography sx={{ mt: 3, mb: 1, fontSize: 22, fontWeight: 400 }}>KHÔNG CÓ KẾT QUẢ TÌM KIẾM</Typography>
      <Typography sx={{ fontWeight: 400 }}>
        Không tìm thấy kết quả cho tìm kiếm &quot;<strong>{keyword}</strong>&quot;
      </Typography>
    </Box>
  );
}

export default NoSearchResult;
