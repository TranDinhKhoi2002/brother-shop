import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ProductItem from './ProductItem';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', width: 50, height: 50, right: 20 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', width: 50, height: 50, left: 20, zIndex: 2 }}
      onClick={onClick}
    />
  );
}

function RelatedProducts({ products }) {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: products.length >= 6 ? 6 : 10,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="mt-5 mb-10">
      <h3 className="text-center text-2xl font-medium">Sản phẩm liên quan</h3>
      <Slider {...settings} className="my-3">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </Slider>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default RelatedProducts;
