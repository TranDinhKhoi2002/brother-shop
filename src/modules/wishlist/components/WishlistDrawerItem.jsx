import { useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'cloudinary-react';
import WishlistSizesMenu from './WishlistSizesMenu';
import WishlistQuantity from './WishlistQuantity';
import Button from '@/common/components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { fetchRemoveFromWishlist } from '@/redux/slices/wishlist';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { addToCart, fetchAddToCart, assignProductsToCart, selectCartProducts } from '@/redux/slices/cart';
import ConfirmRemoveModal from '@/common/components/Modal/ConfirmRemoveModal';

function WishlistDrawerItem({ product }) {
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
          <WishlistQuantity ref={quantityRef} price={product.price} id={product._id} />
          <Button
            className={`w-[200px] rounded-none mt-2 ${isAddedToCart && '!bg-lightGray100 !text-[#787878]'}`}
            disabled={isAddedToCart}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? 'Đã thêm' : 'Thêm vào giỏ hàng'}
          </Button>
        </Box>
      </Stack>
      <ConfirmRemoveModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        onClose={() => setModalIsVisible(false)}
        onDelete={handleRemoveFromWishlist}
      />
    </>
  );
}

export default WishlistDrawerItem;
