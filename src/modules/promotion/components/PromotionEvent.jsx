import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import PromotionBanner from './PromotionBanner';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import PromotionList from './PromotionList';

function PromotionEvent({ banner, title, promotions }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <Box sx={{ my: 6 }}>
      <PromotionBanner image={banner} />
      <Typography variant="h3" textAlign="center" sx={{ my: 6 }}>
        {title}
      </Typography>
      <PromotionList promotions={promotions} />
    </Box>
  );
}

PromotionEvent.propTypes = {
  banner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  promotions: PropTypes.array.isRequired,
};

export default PromotionEvent;
