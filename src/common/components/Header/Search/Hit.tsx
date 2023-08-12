import { cld } from '@/utils/lib/cloudinary';
import { renderPrice } from '@/utils/product';
import { AdvancedImage } from '@cloudinary/react';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Highlight } from 'react-instantsearch';

type SearchResultsProps = {
  hit: any;
  onSelect: () => void;
};

function CustomHit({ hit, onSelect }: SearchResultsProps): ReactElement {
  const mainImg = cld.image(hit.images.mainImg);

  return (
    <Grid container spacing={3} sx={{ my: 1 }}>
      <Grid item xs={2}>
        <AdvancedImage cldImg={mainImg} />
      </Grid>
      <Grid item xs={10}>
        <Link href={`/shop/products/${hit._id.$oid}`} onClick={onSelect}>
          <Highlight hit={hit} attribute="name" style={{ fontWeight: '500' }} />
        </Link>
        {renderPrice(hit)}
      </Grid>
    </Grid>
  );
}

export default CustomHit;
