import { Image } from 'cloudinary-react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { printNumberWithCommas } from '@/utils/common/index.ts';
import Link from 'next/link';

function ProductItem({ product, forDetail }) {
  return (
    <div className="group flex relative overflow-hidden pb-[22px]">
      <div className="group-hover:translate-x-[-100%] transition-all duration-700 ease-in-out cursor-pointer">
        <Link href={`/shop/products/${product._id}`}>
          <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={product.images?.mainImg} alt="" />
        </Link>
      </div>
      <div className="w-full absolute right-[-300%] group-hover:right-0 transition-all duration-700 ease-in-out cursor-pointer">
        <Link href={`/shop/products/${product._id}`}>
          <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={product.images?.subImg} alt="" />
        </Link>
      </div>
      {!forDetail && (
        <div className="absolute inline-block top-[95%] sm:top-[97.3%] md:top-[95.2%] text-[11px] font-normal ml-1">
          {product.oldPrice ? (
            <Fragment>
              <span className="line-through">{printNumberWithCommas(product.oldPrice)}</span>
              <span className="ml-1 text-[#ff0000]">{printNumberWithCommas(product.price)}</span>
            </Fragment>
          ) : (
            <span>{printNumberWithCommas(product.price)}</span>
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
