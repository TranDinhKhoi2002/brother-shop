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

  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonData = async () => {
      const { success, customer } = await dispatch(fetchCommonData()).unwrap();

      if (success && customer) {
        dispatch(setAuth({ user: customer }));
        dispatch(assignProductsToCart({ cart: customer.cart }));
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

  return (
    <Fragment>
      <Header showSideBar={openSideBarHandler} />
      <Sidebar isVisible={sideBarActive} onClose={closeSideBarHandler} />
      <Box>{props.children}</Box>
      <Footer />
    </Fragment>
  );
}

export default Layout;
