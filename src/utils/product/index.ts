import { AppSizes, SIZES } from '@/constants';
import { ProductSize } from '@/types/product';

export const getRemainingQuantity = (productSizes: ProductSize[], selectedSize: string) => {
  const sizeItem = productSizes.find((size) => size.name === selectedSize);
  if (sizeItem) {
    const remainingQuantity = sizeItem.quantity - sizeItem.sold;
    return remainingQuantity;
  }
};

export const isSoldOutForEverySize = (productSizes: ProductSize[], selectedSize: string) => {
  const remainingQuantity = getRemainingQuantity(productSizes, selectedSize);
  if (remainingQuantity === 0) {
    return true;
  }

  return false;
};

export const isSoldOutForAllSizes = (productSizes: ProductSize[]) => {
  let isSoldOut = true;
  Object.keys(SIZES).forEach((key) => {
    if (!isSoldOutForEverySize(productSizes, (SIZES as AppSizes)[key])) {
      isSoldOut = false;
    }
  });
  return isSoldOut;
};
