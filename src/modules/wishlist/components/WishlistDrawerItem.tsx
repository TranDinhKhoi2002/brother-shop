import { ReactElement, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { v4 as uuidv4 } from 'uuid';
import WishlistSizesMenu, { WishlistSizesMenuRef } from './WishlistSizesMenu';
import WishlistQuantity, { WishlistQuantityRef } from './WishlistQuantity';
import Button from '@/common/components/Buttons/Button';
import { fetchRemoveFromWishlist } from '@/redux/slices/wishlist';
import { addToCart, fetchAddToCart, assignProductsToCart, selectCartProducts } from '@/redux/slices/cart';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { cld } from '@/utils/cloudinary';

type WishlistDrawerItemProps = {
  product: Product;
};

function WishlistDrawerItem({ product }: WishlistDrawerItemProps): ReactElement {
  const [isSoldOut, setIsSoldOut] = useState(product?.sizes[0]?.quantity - product?.sizes[0].sold === 0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const cartProducts = useSelector(selectCartProducts);
  const isAddedToCart = cartProducts.findIndex((item) => item.productId._id === product._id) !== -1;
  const cldImg = cld.image(product.images.mainImg);

  const sizesRef = useRef<WishlistSizesMenuRef>();
  const quantityRef = useRef<WishlistQuantityRef>();

  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleRemoveFromWishlist = async () => {
    try {
      const { success, message } = await dispatch(fetchRemoveFromWishlist({ productId: product._id })).unwrap();

      if (success) {
        toast.success(message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleAddToCart = async () => {
    if (!sizesRef.current || !quantityRef.current) return;

    const size = sizesRef.current.getSelectedSize();
    const quantity = +quantityRef.current.getQuantity();

    if (!isAuthenticated) {
      dispatch(
        addToCart({
          productId: product,
          size,
          quantity,
          _id: uuidv4(),
        }),
      );
      toast.success('Đã thêm vào giỏ hàng');
      return;
    }

    try {
      const { success, cart } = await dispatch(fetchAddToCart({ productId: product._id, size, quantity })).unwrap();
      if (success) {
        toast.success('Đã thêm vào giỏ hàng');
        dispatch(assignProductsToCart({ cart: cart }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleSizeChange = (isSoldOutParam: boolean) => {
    if (isSoldOutParam) {
      setIsSoldOut(true);
    } else {
      setIsSoldOut(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ my: 4, position: 'relative' }}>
        <CloseIcon
          sx={{ position: 'absolute', top: -20, right: 0, fontSize: 18, cursor: 'pointer' }}
          onClick={() => setModalIsVisible(true)}
        />
        <Grid item xs={4}>
          <AdvancedImage cldImg={cldImg} plugins={[lazyload(), responsive(), placeholder()]} />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography sx={{ fontWeight: 400 }}>{product.name}</Typography>
            <WishlistSizesMenu ref={sizesRef} sizes={product.sizes} onSizeChange={handleSizeChange} />
            <WishlistQuantity ref={quantityRef} price={product.price} id={product._id} />
            {isSoldOut ? (
              <Button className={'w-[200px] rounded-none mt-2 !bg-lightGray100 !text-[#787878]'} disabled>
                Hết hàng
              </Button>
            ) : (
              <Button
                className={`w-[200px] rounded-none mt-2 ${isAddedToCart && '!bg-lightGray100 !text-[#787878]'}`}
                disabled={isAddedToCart}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? 'Đã thêm' : 'Thêm vào giỏ hàng'}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <ConfirmModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setModalIsVisible(false)}
        onConfirm={handleRemoveFromWishlist}
      />
    </>
  );
}

export default WishlistDrawerItem;
