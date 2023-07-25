import { useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'cloudinary-react';
import WishlistSizesMenu from './WishlistSizesMenu';
import WishlistQuantity from './WishlistQuantity';
import Button from '@/common/components/Buttons/Button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { fetchRemoveFromWishlist } from '@/redux/slices/wishlist';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { addToCart, fetchAddToCart, assignProductsToCart, selectCartProducts } from '@/redux/slices/cart';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';

function WishlistDrawerItem({ product }) {
  const [isSoldOut, setIsSoldOut] = useState(product?.sizes[0]?.quantity - product?.sizes[0].sold === 0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const cartProducts = useSelector(selectCartProducts);
  const isAddedToCart = cartProducts.findIndex((item) => item.productId._id === product._id) !== -1;

  const sizesRef = useRef();
  const quantityRef = useRef();

  const dispatch = useDispatch();
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

  const handleSizeChange = (isSoldOutParam) => {
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
          <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={product.images.mainImg} alt="" />
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
