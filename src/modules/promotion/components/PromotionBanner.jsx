import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Image from 'next/image';

function PromotionBanner({ image }) {
  return (
    <Stack direction="row" justifyContent="center">
      <Image src={image} width={1000} height={1000} priority alt="" />
    </Stack>
  );
}

PromotionBanner.propTypes = {
  image: PropTypes.string.isRequired,
};

export default PromotionBanner;
