import { useEffect, useState } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import CartTable from '@/modules/cart/components/CartTable';
import PreviewInvoice from '@/modules/cart/components/PreviewInvoice';
import { Container } from '@mui/material';

function CartPage(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer barTitle="Thông tin giỏ hàng của bạn" headTitle="Giỏ Hàng">
      <Container maxWidth="xxl">
        <CartTable />
        <PreviewInvoice />
      </Container>
    </PageContainer>
  );
}

export default CartPage;
