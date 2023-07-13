import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import NextImage from 'next/image';
import { GlassMagnifier } from 'react-image-magnifiers';
import { Stack } from '@mui/material';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import { appAssets } from '@/common/assets';

function PreviewImages({ images }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false} className="imageContainer">
        <GlassMagnifier
          alwaysInPlace={true}
          fillAvailableSpace={true}
          imageSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${images.mainImg}`}
          magnifierSize="50%"
          imageAlt=""
        >
          <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={images.mainImg} alt="" />
        </GlassMagnifier>

        <GlassMagnifier
          alwaysInPlace={true}
          fillAvailableSpace={true}
          imageSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${images.subImg}`}
          magnifierSize="50%"
          imageAlt=""
        >
          <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={images.subImg} alt="" />
        </GlassMagnifier>
      </Slider>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        {Object.values(images).map((image) => (
          <NextImage
            key={image}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${image}`}
            width={200}
            height={200}
            style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100px' }}
            alt=""
            placeholder="blur"
            blurDataURL={appAssets.loadingGif}
          />
        ))}
      </Stack>
    </>
  );
}

PreviewImages.propTypes = {
  images: PropTypes.object.isRequired,
};

export default PreviewImages;
