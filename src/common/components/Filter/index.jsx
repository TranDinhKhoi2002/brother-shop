import { Box, List, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductTypes from './FilterProductTypes';
import FilterPrice from './FilterPrice';
import FilterMaterial from './FilterMaterial';

function Filter({ selectedFilters, onFilter, onChangePriceRange }) {
  return (
    <Box>
      <Typography sx={{ mt: 4, fontSize: 20, fontWeight: 400 }}>
        Bộ lọc <TuneIcon />
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
        <FilterProductTypes onFilter={onFilter} selectedFilters={selectedFilters} />
        <FilterPrice onChangePriceRange={onChangePriceRange} />
        <FilterMaterial />
      </List>
    </Box>
  );
}

export default Filter;
