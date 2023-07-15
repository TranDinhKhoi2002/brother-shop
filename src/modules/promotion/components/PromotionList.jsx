import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PromotionItem from './PromotionItem';

function PromotionList({ promotions, isUsedInProfile = false }) {
  const validPromotions = promotions.filter((promotion) => !promotion.expired);

  return (
    <Grid container spacing={4}>
      {validPromotions.map((promotion) => (
        <Grid key={promotion?._id} item xs={12} md={6}>
          <PromotionItem item={promotion} isUsedInProfile={isUsedInProfile} />
        </Grid>
      ))}
    </Grid>
  );
}

PromotionList.propTypes = {
  promotions: PropTypes.array.isRequired,
  isUsedInProfile: PropTypes.bool,
};

PromotionList.defaultProps = {
  isUsedInProfile: false,
};

export default PromotionList;
