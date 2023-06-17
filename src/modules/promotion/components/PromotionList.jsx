import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PromotionItem from './PromotionItem';

function PromotionList({ promotions, isUsedInProfile = false }) {
  return (
    <Grid container spacing={4}>
      {promotions.map((promotion) => (
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
  promotions: [],
  isUsedInProfile: false,
};

export default PromotionList;
