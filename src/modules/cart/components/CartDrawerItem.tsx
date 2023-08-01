import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Grid, IconButton, Stack, Typography, Theme } from '@mui/material';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useTheme } from '@mui/styles';
import { toast } from 'react-toastify';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import {
  assignProductsToCart,
  fetchUpdateQuantity,
  updateAmountOfProduct,
  removeFromCart,
  fetchRemoveItemFromCart,
} from '@/redux/slices/cart';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { cld } from '@/utils/cloudinary';
import { printNumberWithCommas } from '@/utils/common';

type CartDrawerItemProps = {
  cartProduct: CartItem;
};

function CartDrawerItem({ cartProduct }: CartDrawerItemProps): ReactElement {
  const [quantity, setQuantity] = useState(cartProduct.quantity);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const product = cartProduct.productId as Product;
  const img = cld.image(product.images.mainImg);

  useEffect(() => {
    setQuantity(cartProduct.quantity);
  }, [cartProduct]);

  const handleUpdateQuantity = async (quantity: number) => {
    if (!isAuthenticated) {
      dispatch(
        updateAmountOfProduct({
          id: product._id,
          size: cartProduct.size,
          quantity: quantity,
        }),
      );
      return;
    }

    try {
      const { cart, success } = await dispatch(
        fetchUpdateQuantity({
          productId: product._id,
          size: cartProduct.size,
          quantity: quantity,
        }),
      ).unwrap();

      if (success) {
        dispatch(assignProductsToCart({ cart }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
    return;
  };

  const handleIncreaseQuantity = () => {
    handleUpdateQuantity(quantity + 1);
    setQuantity((prevState) => prevState + 1);
  };

  const handleDecreaseQuantity = () => {
    handleUpdateQuantity(quantity - 1);
    setQuantity((prevState) => prevState - 1);
  };

  const handleRemoveFromCart = async () => {
    if (!isAuthenticated) {
      dispatch(removeFromCart({ id: product._id, size: cartProduct.size }));
      setModalIsVisible(false);
      return;
    }

    try {
      const { success, cart, message } = await dispatch(
        fetchRemoveItemFromCart({ productId: product._id, size: cartProduct.size }),
      ).unwrap();

      if (success) {
        dispatch(assignProductsToCart({ cart }));

        setModalIsVisible(false);
        toast.success(message);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
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
          <AdvancedImage cldImg={img} plugins={[responsive(), placeholder()]} style={{ marginLeft: 0 }} />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Link href={`/shop/products/${product._id}`}>
              <Typography sx={{ fontWeight: 500 }}>{product.name}</Typography>
            </Link>
            <Typography sx={{ fontWeight: 400, color: theme.palette.grey['600'], my: 1 }}>
              SIZE: {cartProduct.size}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100px', mt: 1, border: 1, py: '4px', px: 1 }}
            >
              <IconButton onClick={handleDecreaseQuantity} disabled={quantity === 1}>
                <RemoveIcon sx={{ fontSize: '14px' }} />
              </IconButton>
              <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{quantity}</Typography>
              <IconButton onClick={handleIncreaseQuantity}>
                <AddIcon sx={{ fontSize: '14px' }} />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>{printNumberWithCommas(product.price * quantity)} đ</Typography>
              {product.oldPrice && (
                <Typography sx={{ fontWeight: 400, fontSize: 14, textDecorationLine: 'line-through' }}>
                  {printNumberWithCommas(product.oldPrice * quantity || 0)} đ
                </Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <ConfirmModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setModalIsVisible(false)}
        onConfirm={handleRemoveFromCart}
      />
    </>
  );
}

export default CartDrawerItem;