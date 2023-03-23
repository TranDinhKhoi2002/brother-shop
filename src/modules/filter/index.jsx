import Filter from '@/common/components/Filter';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Products from '../product/components/Products';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { getProductsByFilters } from '@/services/productRequests';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';

function CategoryFilter({ loadedProducts }) {
  const [products, setProducts] = useState(loadedProducts);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState();

  const router = useRouter();

  useEffect(() => {
    const existingFilters = router.query.types === undefined ? [] : router.query.types?.split(',');

    setSelectedTypes(existingFilters);
  }, [router.query.types]);

  const handleSelectTypeFilters = async (filter) => {
    let updatedTypeFilters = [...selectedTypes];
    const existingFilter = updatedTypeFilters.find((filterItem) => filterItem === filter);

    if (existingFilter) {
      updatedTypeFilters = updatedTypeFilters.filter((filterItem) => filterItem !== filter);
    } else {
      updatedTypeFilters.push(filter);
    }

    setSelectedTypes(updatedTypeFilters);
    await getProducts(updatedTypeFilters, priceRange);
  };

  const handleRemoveTypeFilters = async (filter) => {
    const updatedFilters = selectedTypes.filter((filterItem) => filterItem !== filter);
    setSelectedTypes(updatedFilters);
    await getProducts(updatedFilters, priceRange);
  };

  const handleRemoveAllFilters = () => {
    setSelectedTypes([]);
    setPriceRange();
    setProducts(loadedProducts);

    router.push(`/category/${router.query.categoryId}`);
  };

  const handleRangeChange = async (newValue) => {
    setPriceRange(newValue);
    await getProducts(selectedTypes, newValue);
  };

  const handleRemovePriceRange = async () => {
    setPriceRange();
    await getProducts(selectedTypes, null);
  };

  const getProducts = async (types, priceRange) => {
    let path = `/category/${router.query.categoryId}?`;

    if (types.length > 0) {
      path = path.concat(`types=${types.join(',')}&`);
    }

    if (priceRange) {
      path = path.concat(`priceFrom=${priceRange[0]}&priceTo=${priceRange[1]}`);
    }

    router.push(path);

    const { products } = await getProductsByFilters(
      types.join(',') || null,
      priceRange ? priceRange[0] : null,
      priceRange ? priceRange[1] : null,
    );

    if (products === null) {
      setProducts(loadedProducts);
      return;
    }

    setProducts(products);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          {selectedTypes && (
            <Filter
              onFilter={handleSelectTypeFilters}
              onChangePriceRange={handleRangeChange}
              selectedFilters={selectedTypes}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={9} sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            {selectedTypes &&
              selectedTypes.map((filter) => (
                <Grid item key={filter}>
                  <Button
                    sx={{
                      backgroundColor: '#f4f4f4 !important',
                      border: '1px solid #e1e2e3',
                      textTransform: 'uppercase',
                      py: '4px',
                      px: 3,
                      borderRadius: '20px',
                    }}
                  >
                    {filter}{' '}
                    <IconButton
                      sx={{ ml: 1, backgroundColor: 'white' }}
                      onClick={() => handleRemoveTypeFilters(filter)}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Button>
                </Grid>
              ))}

            {priceRange && (
              <Grid item>
                <Button
                  sx={{
                    backgroundColor: '#f4f4f4 !important',
                    border: '1px solid #e1e2e3',
                    textTransform: 'uppercase',
                    py: '4px',
                    px: 3,
                    borderRadius: '20px',
                  }}
                >
                  {printNumberWithCommas(priceRange[0])}đ - {printNumberWithCommas(priceRange[1])}đ{' '}
                  <IconButton sx={{ ml: 1, backgroundColor: 'white' }} onClick={handleRemovePriceRange}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Button>
              </Grid>
            )}

            {selectedTypes && selectedTypes.length > 0 && (
              <Grid item>
                <Button
                  sx={{
                    backgroundColor: 'white !important',
                    border: '1px solid #e1e2e3',
                    textTransform: 'uppercase',
                    height: '39.6px',
                    px: 3,
                    borderRadius: '20px',
                  }}
                  onClick={handleRemoveAllFilters}
                >
                  Xoá tất cả
                </Button>
              </Grid>
            )}
          </Grid>
          <Products products={products} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryFilter;
