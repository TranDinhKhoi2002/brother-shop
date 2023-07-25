import CartDrawer from '@/modules/cart/components/CartDrawer';
import WishlistDrawer from '@/modules/wishlist/components/WishlistDrawer';
import { setAuth } from '@/redux/slices/auth';
import { assignProductsToCart } from '@/redux/slices/cart';
import { fetchCommonData } from '@/redux/slices/data';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Call';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Footer from '../Footer/Footer';
import Header from '../Header/index';
import Sidebar from './Sidebar/index';
import { assignPromotions } from '@/redux/slices/promotions';
import { useAppDispatch } from '@/hooks/useAppDispatch';

type LayoutProps = {
  children: ReactNode;
};

function Layout(props: LayoutProps): ReactElement {
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const [cartPreviewActive, setCartPreviewActive] = useState<boolean>(false);
  const [wishlistActive, setWishlistActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCommonData = async () => {
      const { customer } = await dispatch(fetchCommonData()).unwrap();

      if (customer) {
        dispatch(setAuth({ user: customer }));
        dispatch(assignProductsToCart({ cart: customer.cart }));
        dispatch(assignProductsToWishlist({ products: customer.wishlist }));
        dispatch(assignPromotions({ promotions: customer.promotions }));
      } else {
        const sessionID = localStorage.getItem('sessionID');
        const existingCart = JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`) || '{}');
        dispatch(
          assignProductsToCart({
            cart: sessionID === null ? [] : existingCart,
          }),
        );
      }
    };

    getCommonData();
  }, [dispatch]);

  const openSideBarHandler = () => {
    setSideBarActive(true);
  };

  const closeSideBarHandler = () => {
    setSideBarActive(false);
  };

  const openCartPreviewHandler = () => {
    setCartPreviewActive(true);
  };

  const closeCartPreviewHandler = () => {
    setCartPreviewActive(false);
  };

  const openWishlistHandler = () => {
    setWishlistActive(true);
  };

  const closeWishlistHandler = () => {
    setWishlistActive(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Header
        showSideBar={openSideBarHandler}
        showCartPreview={openCartPreviewHandler}
        showWishlist={openWishlistHandler}
      />
      <Sidebar isVisible={sideBarActive} onClose={closeSideBarHandler} />
      <CartDrawer isVisible={cartPreviewActive} onClose={closeCartPreviewHandler} />
      <WishlistDrawer isVisible={wishlistActive} onClose={closeWishlistHandler} />
      <Box>{props.children}</Box>
      <Fab color="secondary" aria-label="add" href="tel:0349175927" sx={{ position: 'fixed', bottom: 100, right: 24 }}>
        <AddIcon />
      </Fab>
      <MessengerCustomerChat
        pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
        htmlRef={process.env.NEXT_PUBLIC_BASE_URL}
        language="vi_VN"
      />
      <Footer />
    </Box>
  );
}

export default Layout;
