import CartDrawer from '@/modules/cart/components/CartDrawer';
import WishlistDrawer from '@/modules/wishlist/components/WishlistDrawer';
import { setAuth } from '@/redux/slices/auth';
import { assignProductsToCart } from '@/redux/slices/cart';
import { fetchCommonData, setData } from '@/redux/slices/data';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import { Box } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header';
import Sidebar from './Sidebar';

function Layout(props) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [cartPreviewActive, setCartPreviewActive] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonData = async () => {
      const { success, customer } = await dispatch(fetchCommonData()).unwrap();

      // console.log(customer);

      if (customer) {
        dispatch(setAuth({ user: customer, type: 'email' }));
        dispatch(assignProductsToCart({ cart: customer.cart }));
        dispatch(assignProductsToWishlist({ products: customer.wishlist }));
      } else {
        const cart = JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`));
        dispatch(assignProductsToCart({ cart }));
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
    <Fragment>
      <Header
        showSideBar={openSideBarHandler}
        showCartPreview={openCartPreviewHandler}
        showWishlist={openWishlistHandler}
      />
      <Sidebar isVisible={sideBarActive} onClose={closeSideBarHandler} />
      <CartDrawer isVisible={cartPreviewActive} onClose={closeCartPreviewHandler} />
      <WishlistDrawer isVisible={wishlistActive} onClose={closeWishlistHandler} />
      <Box>{props.children}</Box>
      <Footer />
    </Fragment>
  );
}

export default Layout;
