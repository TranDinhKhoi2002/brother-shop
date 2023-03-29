import { useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ConfirmDeleteModal from '@/modules/cart/components/ConfirmDeleteModal';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'cloudinary-react';
import WishlistSizesMenu from './WishlistSizesMenu';
import WishlistQuantity from './WishlistQuantity';
import Button from '@/common/components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { fetchRemoveFromWishlist } from '@/redux/slices/wishlist';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { addToCart, fetchAddToCart, assignProductsToCart } from '@/redux/slices/cart';

function WishlistDrawerItem({ product }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

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
      console.log(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ my: 4, position: 'relative' }}>
        <CloseIcon
          sx={{ position: 'absolute', top: -20, right: 0, fontSize: 18, cursor: 'pointer' }}
          onClick={() => setModalIsVisible(true)}
        />
        <Box>
          <Image
            cloudName="ddajkcbs2"
            publicId={product.images.mainImg}
            alt=""
            style={{ width: '120px', marginLeft: 0 }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 400 }}>{product.name}</Typography>
          <WishlistSizesMenu ref={sizesRef} />
          <WishlistQuantity ref={quantityRef} price={product.price} />
          <Button className="w-[200px] rounded-none mt-2" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
        </Box>
      </Stack>
      <ConfirmDeleteModal
        isOpen={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        onDelete={handleRemoveFromWishlist}
      />
    </>
  );
}

export default WishlistDrawerItem;
