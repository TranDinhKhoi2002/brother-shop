import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

function ShippingMethod({ method, title, desc }) {
  return (
    <Stack direction="row" alignItems="center" spacing="20px">
      <Image src={`/assets/images/${method}.svg`} alt="" width={50} height={50} />
      <Box>
        <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>{title}</Typography>
        <Typography sx={{ fontSize: '14px' }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

export default ShippingMethod;
