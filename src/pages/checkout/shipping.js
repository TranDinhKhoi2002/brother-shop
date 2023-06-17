import PageContainer from '@/common/components/Layout/PageContainer';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import CartInfor from '@/modules/cart/components/CartInfor';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import { selectCartProducts } from '@/redux/slices/cart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CheckoutShipping() {
  const [loaded, setLoaded] = useState(false);
  const products = useSelector(selectCartProducts);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      {products.length === 0 ? <EmptyCart /> : <CartInfor />}
    </PageContainer>
  );
}

export default CheckoutShipping;
