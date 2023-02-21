import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { SideBySideMagnifier } from 'react-image-magnifiers';

function PreviewImages({ images }) {
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
  );
}

PreviewImages.propTypes = {
  images: PropTypes.object.isRequired,
};

export default PreviewImages;
