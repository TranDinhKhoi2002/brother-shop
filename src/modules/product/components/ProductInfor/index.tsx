import { selectIsAuthenticated } from '@/redux/slices/auth';
import { addToCart, assignProductsToCart, fetchAddToCart } from '@/redux/slices/cart';
import { Box, Grid, Stack, Typography, Button as ButtonMUI } from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import GeneralInfor from './Generalnfor';
import NumberBox, { NumberBoxRef } from './NumberBox';
import PreviewImages from './PreviewImages';
import Policies from './Policies';
import { ReactElement, useRef, useState } from 'react';
import ProductSizes from './ProductSizes';
import SizeGuideModal from './SizeGuideModal';
import PreservationInstruction from './PreservationInstruction';
import LoginModal from '@/modules/auth/components/LoginModal';
import { fetchAddToWishlist } from '@/redux/slices/wishlist';
import { CustomProductSize, Product } from '@/types/product';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getRemainingQuantity, isSoldOutForAllSizes, isSoldOutForEverySize } from '@/utils/product';

type ProductInforProps = {
  product: Product;
};

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

function ProductInfor({ product }: ProductInforProps): ReactElement {
  const [currentSize, setCurrentSize] = useState<CustomProductSize>();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loginModalIsVisible, setLoginModalIsVisible] = useState(false);
  const inputRef = useRef<NumberBoxRef | null>(null);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sizes = product.sizes.map((size) => ({ name: size.name, remainingQuantity: size.quantity - size.sold }));
  const dispatch = useAppDispatch();

  const addToCartHandler = async (size: string) => {
    if (!currentSize) {
      toast.error('Bạn vui lòng chọn size');
      return;
    }

    const remainingQuantity = getRemainingQuantity(product.sizes, size);
    if (remainingQuantity && remainingQuantity < +inputRef!.current!.getQuantity()) {
      toast.error('Số lượng sản phẩm còn lại không đủ');
      return;
    }

    if (!isAuthenticated) {
      dispatch(addToCart({ productId: product, size, quantity: +inputRef!.current!.getQuantity(), _id: uuidv4() }));
      toast.success('Đã thêm vào giỏ hàng');
      return;
    }

    try {
      const { success, cart } = await dispatch(
        fetchAddToCart({ productId: product._id, size, quantity: +inputRef!.current!.getQuantity() }),
      ).unwrap();
      if (success) {
        toast.success('Đã thêm vào giỏ hàng');
        dispatch(assignProductsToCart({ cart: cart }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleChangeSize = (size: CustomProductSize) => {
    setCurrentSize(size);
  };

  const handleChooseSize = (sizeName: string) => {
    const size = sizes.find((size) => size.name === sizeName);
    setCurrentSize(size);
    setModalIsVisible(false);
  };

  const handleAddToWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      setLoginModalIsVisible(true);
      return;
    }

    try {
      const { success, message } = await dispatch(fetchAddToWishlist({ productId })).unwrap();

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
          <Box sx={{ pr: 6 }}>
            <PreviewImages images={product.images} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ px: 2 }}>
            <GeneralInfor
              name={product.name}
              _id={product._id.slice(0, 8).toUpperCase()}
              price={product.price}
              oldPrice={product.oldPrice}
              isSoldOut={isSoldOutForAllSizes(product.sizes)}
            />

            <ProductSizes
              sizes={sizes}
              onChange={handleChangeSize}
              product={product}
              isSoldOut={(selectedSize) => isSoldOutForEverySize(product.sizes, selectedSize)}
              currentSize={currentSize}
              onDisplayModal={() => setModalIsVisible(true)}
            />

            <Typography sx={{ fontWeight: 400, mt: 3, mb: 2 }}>Chọn số lượng:</Typography>
            <Stack direction="row" alignItems="center" spacing={3}>
              <NumberBox min={1} max={100} ref={inputRef} />
              <Button
                className="w-[250px] rounded-none"
                onClick={() => currentSize?.name && addToCartHandler(currentSize?.name)}
              >
                Mua ngay
              </Button>
              <FavoriteBorderIcon
                sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
                onClick={() => handleAddToWishlist(product._id)}
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
        productSizes={product.sizes}
        onClose={() => setModalIsVisible(false)}
        onSelectSize={handleChooseSize}
      />

      <LoginModal isVisible={loginModalIsVisible} onClose={() => setLoginModalIsVisible(false)} />
    </>
  );
}

export default ProductInfor;