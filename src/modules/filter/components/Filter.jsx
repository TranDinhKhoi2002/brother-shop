import { Box, List, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductTypes from './FilterProductTypes';
import FilterPrice from './FilterPrice';
import FilterMaterial from './FilterMaterial';
import FilterTextures from './FilterTextures';
import useResponsive from '@/hooks/useResponsive';

function Filter({
  selectedFilters,
  selectedMaterials,
  selectedTextures,
  onFilter,
  onChangePriceRange,
  onChangeMaterial,
  onChangeTexture,
}) {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Box>
      {isDesktop && (
        <Typography sx={{ mt: 4, fontSize: 20, fontWeight: 400 }}>
          Bộ lọc <TuneIcon />
        </Typography>
      )}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
        <FilterProductTypes onFilter={onFilter} selectedFilters={selectedFilters} />
        <FilterPrice onChangePriceRange={onChangePriceRange} />
        <FilterMaterial selectedMaterials={selectedMaterials} onChangeMaterial={onChangeMaterial} />
        <FilterTextures selectedTextures={selectedTextures} onChangeTexture={onChangeTexture} />
      </List>
    </Box>
  );
}

export default Filter;
