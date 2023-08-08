import Filter from '@/modules/filter/components/Filter';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import Products from '../../product/components/Products';
import { useRouter } from 'next/router';
import { getProductsByFilters } from '@/services/productRequests';
import { printNumberWithCommas } from '@/utils/common';
import FilterTag from './FilterTag';
import RemoveAllButton from './RemoveAllButton';
import TuneIcon from '@mui/icons-material/Tune';
import useResponsive from '@/hooks/useResponsive';
import FilterDrawer from './FilterDrawer';
import FilterSort from './FilterSort';
import { Product } from '@/types/product';
import ProductsSkeleton from '@/common/components/Skeleton/Products';

type CategoryFilterProps = {
  loadedProducts: Product[];
  categoryName: string;
};

function CategoryFilter({ loadedProducts, categoryName }: CategoryFilterProps): ReactElement {
  const [products, setProducts] = useState(loadedProducts);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[] | null>();
  const [materials, setMaterials] = useState<string[]>([]);
  const [textures, setTextures] = useState<string[]>([]);
  const [filterIsVisible, setFilterIsVisible] = useState(false);

  const router = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    setProducts(loadedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.categoryId]);

  useEffect(() => {
    const existingTypeFilters = router.query.types === undefined ? [] : (router.query.types as string)?.split(',');
    const existingMaterialFilters =
      router.query.materials === undefined ? [] : (router.query.materials as string)?.split(',');
    const existingTextureFilters =
      router.query.textures === undefined ? [] : (router.query.textures as string)?.split(',');

    setSelectedTypes(existingTypeFilters);
    setMaterials(existingMaterialFilters);
    setTextures(existingTextureFilters);
  }, [router.query.types, router.query.materials, router.query.textures]);

  const handleSelectTypeFilters = async (filter: string) => {
    let updatedTypeFilters = [...selectedTypes];
    const existingFilter = updatedTypeFilters.find((filterItem) => filterItem === filter);

    if (existingFilter) {
      updatedTypeFilters = updatedTypeFilters.filter((filterItem) => filterItem !== filter);
    } else {
      updatedTypeFilters.push(filter);
    }

    setSelectedTypes(updatedTypeFilters);
    await getProducts(updatedTypeFilters, priceRange, materials, textures);
  };

  const handleRemoveTypeFilters = async (filter: string) => {
    const updatedFilters = selectedTypes.filter((filterItem) => filterItem !== filter);
    setSelectedTypes(updatedFilters);
    await getProducts(updatedFilters, priceRange, materials, textures);
  };

  const handleRemoveAllFilters = () => {
    setSelectedTypes([]);
    setPriceRange(null);
    setMaterials([]);
    setTextures([]);
    setProducts(loadedProducts);

    router.replace(`/category/${router.query.categoryId}`);
  };

  const handleRangeChange = async (newValue: number[]) => {
    setPriceRange(newValue);
    await getProducts(selectedTypes, newValue, materials, textures);
  };

  const handleRemovePriceRange = async () => {
    setPriceRange(null);
    await getProducts(selectedTypes, null, materials, textures);
  };

  const handleSelectMaterialFilters = async (material: string) => {
    let updatedMaterialFilters = [...materials];
    const existingFilter = updatedMaterialFilters.find((filterItem) => filterItem === material);

    if (existingFilter) {
      updatedMaterialFilters = updatedMaterialFilters.filter((filterItem) => filterItem !== material);
    } else {
      updatedMaterialFilters.push(material);
    }

    setMaterials(updatedMaterialFilters);
    await getProducts(selectedTypes, priceRange, updatedMaterialFilters, textures);
  };

  const handleRemoveMaterialFilters = async (material: string) => {
    const updatedMaterials = materials.filter((item) => item !== material);
    setMaterials(updatedMaterials);
    await getProducts(selectedTypes, priceRange, updatedMaterials, textures);
  };

  const handleSelectTextureFilters = async (texture: string) => {
    let updatedTextureFilters = [...textures];
    const existingFilter = updatedTextureFilters.find((filterItem) => filterItem === texture);

    if (existingFilter) {
      updatedTextureFilters = updatedTextureFilters.filter((filterItem) => filterItem !== texture);
    } else {
      updatedTextureFilters.push(texture);
    }

    setTextures(updatedTextureFilters);
    await getProducts(selectedTypes, priceRange, materials, updatedTextureFilters);
  };

  const handleRemoveTextureFilters = async (texture: string) => {
    const updatedTextures = textures.filter((item) => item !== texture);
    setTextures(updatedTextures);
    await getProducts(selectedTypes, priceRange, materials, updatedTextures);
  };

  const handleSort = (key: string) => {
    const sortedProducts = [...products];

    switch (key) {
      case 'priceDesc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'priceAsc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'bestSeller':
        sortedProducts.sort((a, b) => b.totalSold - a.totalSold);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const getProducts = async (
    types: string[],
    priceRange?: number[] | null,
    materials?: string[],
    textures?: string[],
  ) => {
    let path = `/category/${router.query.categoryId}?`;

    if (types.length > 0) {
      path = path.concat(`types=${types.join(',')}&`);
    }

    if (priceRange) {
      path = path.concat(`priceFrom=${priceRange[0]}&priceTo=${priceRange[1]}&`);
    }

    if (materials && materials.length > 0) {
      path = path.concat(`materials=${materials.join(',')}&`);
    }

    if (textures && textures.length > 0) {
      path = path.concat(`textures=${textures.join(',')}`);
    }

    router.replace(path);

    const { products } = await getProductsByFilters(
      router.query.categoryId as string,
      types.join(',') || null,
      priceRange ? priceRange[0] : null,
      priceRange ? priceRange[1] : null,
      materials?.join(',') || null,
      textures?.join(',') || null,
    );

    if (products === null) {
      setProducts(loadedProducts);
      return;
    }

    setProducts(products);
  };

  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', my: 4 }}>
        {categoryName}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          {selectedTypes && isDesktop ? (
            <Filter
              onFilter={handleSelectTypeFilters}
              onChangePriceRange={handleRangeChange}
              onChangeMaterial={handleSelectMaterialFilters}
              selectedFilters={selectedTypes}
              selectedMaterials={materials}
              selectedTextures={textures}
              onChangeTexture={handleSelectTextureFilters}
            />
          ) : (
            <Button sx={{ fontSize: 20 }} onClick={() => setFilterIsVisible(true)}>
              Bộ lọc <TuneIcon sx={{ ml: 1 }} />
            </Button>
          )}
        </Grid>
        {router.isFallback ? (
          <Grid item xs={12} lg={9} sx={{ mt: 4 }}>
            <ProductsSkeleton />
          </Grid>
        ) : (
          <Grid item xs={12} lg={9} sx={{ mt: 4 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              sx={{ mb: 3 }}
            >
              <Typography sx={{ fontWeight: 400, fontSize: 18 }}>{products?.length} sản phẩm</Typography>
              <FilterSort onSort={handleSort} />
            </Stack>
            <Grid container spacing={1}>
              {selectedTypes.map((filter) => (
                <Grid item key={filter}>
                  <FilterTag title={filter} onClick={handleRemoveTypeFilters} />
                </Grid>
              ))}

              {priceRange && (
                <Grid item>
                  <FilterTag
                    title={`${printNumberWithCommas(priceRange[0])}đ - ${printNumberWithCommas(priceRange[1])}đ`}
                    onClick={handleRemovePriceRange}
                  />
                </Grid>
              )}

              {materials.map((material) => (
                <Grid item key={material}>
                  <FilterTag title={material} onClick={handleRemoveMaterialFilters} />
                </Grid>
              ))}

              {textures.map((texture) => (
                <Grid item key={texture}>
                  <FilterTag title={texture} onClick={handleRemoveTextureFilters} />
                </Grid>
              ))}

              {(selectedTypes.length > 0 || priceRange || materials.length > 0 || textures.length > 0) && (
                <Grid item>
                  <RemoveAllButton onClick={handleRemoveAllFilters} />
                </Grid>
              )}
            </Grid>
            {products?.length > 0 ? (
              <Products products={products} forDetail />
            ) : (
              <Box sx={{ my: 8, textAlign: 'center' }}>
                <Typography variant="h3">Không tìm thấy sản phẩm nào</Typography>
                <Typography variant="body1" sx={{ fontWeight: 400, mt: 2 }}>
                  Chúng tôi không thể tìm thấy sản phẩm phù hợp với việc lựa chọn cùa bạn
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Grid>
      <FilterDrawer isVisible={filterIsVisible} onClose={() => setFilterIsVisible(false)}>
        <Filter
          onFilter={handleSelectTypeFilters}
          onChangePriceRange={handleRangeChange}
          onChangeMaterial={handleSelectMaterialFilters}
          selectedFilters={selectedTypes}
          selectedMaterials={materials}
          selectedTextures={textures}
          onChangeTexture={handleSelectTextureFilters}
        />
      </FilterDrawer>
    </Box>
  );
}

export default CategoryFilter;
