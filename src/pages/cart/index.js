import { useEffect, useState } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import CartTable from '@/modules/cart/components/CartTable';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import PreviewInvoice from '@/modules/cart/components/PreviewInvoice';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';

function CartPage(props) {
  const [loaded, setLoaded] = useState(false);
  const cartProducts = useSelector(selectCartProducts);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <PageContainer barTitle="Thông tin giỏ hàng của bạn" headTitle="Giỏ Hàng">
      <Container maxWidth="xxl">
        <CartTable />
        {cartProducts.length > 0 && <PreviewInvoice />}
      </Container>
    </PageContainer>
  );
}

export default CartPage;
