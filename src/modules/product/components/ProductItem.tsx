import { Fragment, ReactElement } from 'react';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { printNumberWithCommas } from '@/utils/common';
import Link from 'next/link';
import { Product } from '@/types/product';
import { cld } from '@/utils/cloudinary';

type ProductItemProps = {
  product: Product;
  forDetail?: boolean;
};

function ProductItem({ product, forDetail }: ProductItemProps): ReactElement {
  const mainImg = cld.image(product.images.mainImg);
  const subImg = cld.image(product.images.subImg);

  return (
    <div className="group flex relative overflow-hidden pb-[22px]">
      <div className="group-hover:translate-x-[-100%] transition-all duration-700 ease-in-out cursor-pointer">
        <Link href={`/shop/products/${product._id}`}>
          <AdvancedImage cldImg={mainImg} plugins={[lazyload(), responsive(), placeholder()]} />
        </Link>
      </div>
      <div className="w-full absolute right-[-300%] group-hover:right-0 transition-all duration-700 ease-in-out cursor-pointer">
        <Link href={`/shop/products/${product._id}`}>
          <AdvancedImage cldImg={subImg} plugins={[lazyload(), responsive(), placeholder()]} />
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

export default ProductItem;
