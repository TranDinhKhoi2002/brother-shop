import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import NextImage from 'next/image';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import { Stack } from '@mui/material';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';
import { useEffect, useState } from 'react';

function PreviewImages({ images }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading....</p>;
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
        <SideBySideMagnifier
          alwaysInPlace={true}
          fillAvailableSpace={true}
          imageSrc={`https://res.cloudinary.com/ddajkcbs2/image/upload/${images.mainImg}`}
          imageAlt=""
        >
          <Image cloudName="ddajkcbs2" publicId={images.mainImg} alt="" />
        </SideBySideMagnifier>

        <SideBySideMagnifier
          alwaysInPlace={true}
          fillAvailableSpace={true}
          imageSrc={`https://res.cloudinary.com/ddajkcbs2/image/upload/${images.subImg}`}
          imageAlt=""
        >
          <Image cloudName="ddajkcbs2" publicId={images.subImg} alt="" />
        </SideBySideMagnifier>
      </Slider>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <LightgalleryProvider>
          {Object.values(images).map((image) => (
            <LightgalleryItem
              key={image}
              group="preview-image"
              src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${image}`}
              thumb={`https://res.cloudinary.com/ddajkcbs2/image/upload/${image}`}
            >
              <NextImage
                key={image}
                src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${image}`}
                width={200}
                height={200}
                style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100px' }}
                alt=""
              />
            </LightgalleryItem>
          ))}
        </LightgalleryProvider>
      </Stack>
    </>
  );
}

PreviewImages.propTypes = {
  images: PropTypes.object.isRequired,
};

export default PreviewImages;
