import { setData } from '@/redux/slices/data';
import { getCategories } from '@/services/categoryRequests';
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
      const categories = await getCategories();
      dispatch(setData({ categories }));
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
      <Sidebar isVisible={sideBarActive} onHide={closeSideBarHandler} />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
