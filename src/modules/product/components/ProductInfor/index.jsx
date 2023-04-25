import { selectIsAuthenticated } from '@/redux/slices/auth';
import { addToCart, assignProductsToCart, fetchAddToCart } from '@/redux/slices/cart';
import { Box, Grid, Stack, Typography, Button as ButtonMUI } from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import GeneralInfor from './Generalnfor';
import NumberBox from './NumberBox';
import PreviewImages from './PreviewImages';
import Policies from './Policies';
import { useRef, useState } from 'react';
import ProductSizes from './ProductSizes';
import SizeGuideModal from './SizeGuideModal';
import PreservationInstruction from './PreservationInstruction';
import LoginModal from '@/modules/auth/components/LoginModal';
import { fetchAddToWishlist } from '@/redux/slices/wishlist';

const styles = {
  title: {
    fontWeight: 400,
    position: 'relative',
    paddingLeft: '20px',
    ':before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '12px',
      display: 'block',
      position: 'absolute',
      left: 0,
      bottom: '6px',
      background: '#d40f0f',
    },
  },
};

function ProductInfor({ product }) {
  const [currentSize, setCurrentSize] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loginModalIsVisible, setLoginModalIsVisible] = useState(false);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sizes = product.sizes.map((size) => ({ name: size.name, remainingQuantity: size.quantity - size.sold }));

  const addToCartHandler = async (size) => {
    if (!currentSize) {
      toast.error('Bạn vui lòng chọn size');
      return;
    }

    if (!isAuthenticated) {
      dispatch(addToCart({ productId: product, size, quantity: +inputRef.current.getQuantity(), _id: uuidv4() }));
      toast.success('Đã thêm vào giỏ hàng');
      return;
    }

    try {
      const { success, cart } = await dispatch(fetchAddToCart({ productId: product._id, size, quantity: 1 })).unwrap();
      if (success) {
        toast.success('Đã thêm vào giỏ hàng');
        dispatch(assignProductsToCart({ cart: cart }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleChangeSize = (size) => {
    setCurrentSize(size);
  };

  const handleChooseSize = (sizeName) => {
    const size = sizes.find((size) => size.name === sizeName);
    setCurrentSize(size);
    setModalIsVisible(false);
  };

  const handleAddToWishlist = async (product) => {
    if (!isAuthenticated) {
      setLoginModalIsVisible(true);
      return;
    }

    try {
      const { success, message } = await dispatch(fetchAddToWishlist({ product })).unwrap();

      if (success) {
        toast.success(message);
      } else {
        toast.warn(message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mt: '12px' }}>
        <Grid item xs={12} md={5}>
          <PreviewImages images={product.images} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ px: 2 }}>
            <GeneralInfor
              name={product.name}
              id={product._id.slice(0, 8).toUpperCase()}
              price={product.price}
              oldPrice={product.oldPrice}
            />

            <ProductSizes
              sizes={sizes}
              onChange={handleChangeSize}
              currentSize={currentSize}
              onDisplayModal={() => setModalIsVisible(true)}
            />

            <Typography sx={{ fontWeight: 400, mt: 3, mb: 2 }}>Chọn số lượng:</Typography>
            <Stack direction="row" alignItems="center" spacing={3}>
              <NumberBox min={1} max={100} ref={inputRef} />
              <Button className="w-[250px] rounded-none" onClick={addToCartHandler.bind(this, currentSize?.name)}>
                Mua ngay
              </Button>
              <FavoriteBorderIcon
                sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
                onClick={handleAddToWishlist.bind(this, product)}
              />
            </Stack>

            <Policies />

            <Box sx={{ mt: 3 }}>
              <Typography sx={styles.title}>
                THÔNG TIN CHI TIẾT <strong className="uppercase">{product.name}</strong>
              </Typography>
              <Typography sx={{ my: 2 }}>{product.description}</Typography>
            </Box>

            {!showMore && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <ButtonMUI
                  variant="outlined"
                  sx={{ borderRadius: 0, textTransform: 'uppercase', px: 4, py: 1 }}
                  onClick={() => setShowMore(true)}
                >
                  Xem thêm
                </ButtonMUI>
              </Box>
            )}

            {showMore && <PreservationInstruction onCollapse={() => setShowMore(false)} />}
          </Box>
        </Grid>
      </Grid>
      <SizeGuideModal
        isVisible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        onSelectSize={handleChooseSize}
      />

      <LoginModal isVisible={loginModalIsVisible} onClose={() => setLoginModalIsVisible(false)} />
    </>
  );
}

export default ProductInfor;
