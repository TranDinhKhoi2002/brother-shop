import CartDrawer from '@/modules/cart/components/CartDrawer';
import { setAuth } from '@/redux/slices/auth';
import { assignProductsToCart } from '@/redux/slices/cart';
import { fetchCommonData, setData } from '@/redux/slices/data';
import { Box } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header';
import Sidebar from './Sidebar';

function Layout(props) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [cartPreviewActive, setCartPreviewActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonData = async () => {
      const { success, customer } = await dispatch(fetchCommonData()).unwrap();

      console.log(customer);

      if (customer) {
        dispatch(setAuth({ user: customer }));
        dispatch(assignProductsToCart({ cart: customer.cart }));
      } else {
        const cart = JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`));
        console.log(cart);
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

  return (
    <Fragment>
      <Header showSideBar={openSideBarHandler} showCartPreview={openCartPreviewHandler} />
      <Sidebar isVisible={sideBarActive} onClose={closeSideBarHandler} />
      <CartDrawer isVisible={cartPreviewActive} onClose={closeCartPreviewHandler} />
      <Box>{props.children}</Box>
      <Footer />
    </Fragment>
  );
}

export default Layout;
