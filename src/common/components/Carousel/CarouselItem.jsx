import { Box, Grid } from '@mui/material';
import { Image } from 'cloudinary-react';
import Link from 'next/link';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';

function CarouselItem({ item1, item2 }) {
  const carouselItems = [item1, item2];

  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {carouselItems.map((carouselItem) => (
        <Grid item xs={6} key={carouselItem._id}>
          <h4 className="inline-block md:float-left font-normal lg:text-2xl pb-3 text-[#444444] hover:text-darkBlue200 transition duration-300">
            <Link href={`/events/${carouselItem.tag}`}>{carouselItem.title}</Link>
          </h4>
          <Box>
            <Image cloudName="ddajkcbs2" publicId={carouselItem.mainImg} alt={carouselItem.title} />
          </Box>
          <LightgalleryProvider>
            <Grid container spacing={1}>
              {carouselItem.relatedProducts.map((product, index) => (
                <Grid item key={index} xs={3}>
                  <LightgalleryItem
                    group="mainCarousel"
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${product.images.mainImg}`}
                    thumb={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${product.images.mainImg}`}
                  >
                    <Image cloudName="ddajkcbs2" publicId={product.images.mainImg} alt={product.name} />
                  </LightgalleryItem>
                </Grid>
              ))}
            </Grid>
          </LightgalleryProvider>
        </Grid>
      ))}
    </Grid>
  );
}

export default CarouselItem;
