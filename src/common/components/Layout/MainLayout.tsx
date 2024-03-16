import WishlistDrawer from '@/modules/wishlist/components/Drawer';
import { fetchCommonData } from '@/redux/slices/data';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Call';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Footer from '../Footer';
import Header from '../Header/index';
import Sidebar from './Sidebar/index';
import BackdropLoading from '../Loading/BackdropLoading';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useDrawer from '@/hooks/useDrawer';
import CartDrawer from '@/modules/cart/components/Drawer';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

function Layout(props: LayoutProps): ReactElement {
  const { render: renderCartDrawer, onOpen: onOpenCartDrawer } = useDrawer(CartDrawer);
  const { render: renderSidebar, onOpen: onOpenSidebar } = useDrawer(Sidebar);
  const { render: renderWishlistDrawer, onOpen: onOpenWishlistDrawer } = useDrawer(WishlistDrawer);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleRouteChangeComplete = (url: string) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.asPath, router.events]);

  useEffect(() => {
    dispatch(fetchCommonData());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Header showSideBar={onOpenSidebar} showCartPreview={onOpenCartDrawer} showWishlist={onOpenWishlistDrawer} />
        <Box>{props.children}</Box>
        <Fab
          color="secondary"
          aria-label="add"
          href="tel:0349175927"
          sx={{ position: 'fixed', bottom: 100, right: 24 }}
        >
          <AddIcon />
        </Fab>
        <MessengerCustomerChat
          pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
          appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
          htmlRef={process.env.NEXT_PUBLIC_BASE_URL}
          language="vi_VN"
        />
        <Footer />
        {renderSidebar()}
        {renderCartDrawer()}
        {renderWishlistDrawer()}
      </Box>
      <BackdropLoading isVisible={loading} />
    </>
  );
}

export default Layout;
