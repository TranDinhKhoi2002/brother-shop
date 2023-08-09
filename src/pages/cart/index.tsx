import { ReactElement, useEffect, useState } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import CartTable from '@/modules/cart/components/CartTable';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import PreviewInvoice from '@/modules/cart/components/PreviewInvoice';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';

function CartPage(): ReactElement {
  const [loaded, setLoaded] = useState<boolean>(false);
  const cartProducts = useSelector(selectCartProducts);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <PageContainer barTitle="Thông tin giỏ hàng của bạn" headTitle="Giỏ Hàng">
      <Container maxWidth={false}>
        {loaded ? (
          <>
            <CartTable />
            {cartProducts.length > 0 && <PreviewInvoice />}
          </>
        ) : (
          <BackdropLoading isVisible={!loaded} />
        )}
      </Container>
    </PageContainer>
  );
}

export default CartPage;
