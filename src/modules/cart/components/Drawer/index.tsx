import { Drawer, Box, Stack, Typography, IconButton, Button, Divider } from '@mui/material';
import CustomizedButton from '@/common/components/Buttons/Button';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartProducts } from '@/redux/slices/cart';
import { printNumberWithCommas } from '@/utils/common';
import { useRouter } from 'next/router';
import CartDrawerItem from './components/Item';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import config from '@/config';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { useAppSelector } from '@/hooks/useAppSelector';

type CartDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

function CartDrawer({ isVisible, onClose }: CartDrawerProps) {
  const cartProducts = useAppSelector<CartItem[]>(selectCartProducts);
  const isAuthenticated = useAppSelector<boolean>(selectIsAuthenticated);
  const router = useRouter();

  const totalPrice = cartProducts?.reduce((acc: number, cur) => {
    return acc + (cur.productId as Product).price * cur.quantity;
  }, 0);

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push(config.routes.checkoutShipping);
    } else {
      router.push(config.routes.checkoutLogin);
    }

    onClose();
  };

  const handlePreviewCart = () => {
    router.push(config.routes.cart);
    onClose();
  };

  return (
    <Drawer anchor="right" open={isVisible} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: '30rem' },
          maxHeight: '100vh',
          px: 3,
          py: 4,
          position: 'relative',
          height: '100vh',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
            Giỏ hàng
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {cartProducts.length > 0 && (
          <>
            <Typography sx={{ fontWeight: 400, my: 3 }}>{cartProducts.length} sản phẩm</Typography>

            <Box sx={{ height: '70%', overflowY: 'auto', flex: 1 }}>
              {cartProducts.map((cartProduct, index) => (
                <CartDrawerItem key={index} cartProduct={cartProduct} />
              ))}
            </Box>

            <Divider />

            <Box sx={{ position: 'absolute', left: '24px', right: '24px', bottom: 20 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 400 }}>Tổng tiền:</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 20 }}>{printNumberWithCommas(totalPrice)} đ</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 0, textTransform: 'uppercase', flex: 1, py: '12px' }}
                  onClick={handlePreviewCart}
                >
                  Xem giỏ hàng
                </Button>
                <CustomizedButton className="flex-1 rounded-none font-medium" onClick={handleCheckout}>
                  Thanh toán
                </CustomizedButton>
              </Stack>
            </Box>
          </>
        )}

        {cartProducts.length === 0 && (
          <Typography sx={{ textAlign: 'center', fontWeight: 400, mt: 10 }}>
            Bạn không có sản phẩm nào trong giỏ hàng
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
