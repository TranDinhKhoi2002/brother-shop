// import Image from 'next/image';
import { Image } from 'cloudinary-react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

function ProductItem({ product, forDetail }) {
  const router = useRouter();

  const navigateHandler = () => {
    router.push(forDetail ? product.to : `/${product.to}`);
  };

  return (
    <div className="group flex relative overflow-hidden pb-[22px]">
      <div className="group-hover:translate-x-[-100%] transition-all duration-700 ease-in-out cursor-pointer">
        <Image cloudName="ddajkcbs2" publicId={product.images?.mainImg} alt="" />
      </div>
      <div className="w-full absolute right-[-300%] group-hover:right-0 transition-all duration-700 ease-in-out cursor-pointer">
        <Image cloudName="ddajkcbs2" publicId={product.images?.subImg} alt="" />
      </div>
      {!forDetail && (
        <div className="absolute inline-block top-[95%] sm:top-[97.3%] md:top-[95.2%] text-[11px] font-normal ml-1">
          {product.oldPrice ? (
            <Fragment>
              <span className="line-through">{product.oldPrice}</span>
              <span className="ml-1 text-[#ff0000]">{product.price}</span>
            </Fragment>
          ) : (
            <span>{product.price}</span>
          )}
        </div>
      )}
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  forDetail: PropTypes.bool,
};

export default ProductItem;
