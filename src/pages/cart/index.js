import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import CartInfor from '@/modules/cart/components/CartInfor';
import { useEffect, useState } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import CartTable from '@/modules/cart/components/CartTable';

function CartPage(props) {
  const [loaded, setLoaded] = useState(false);
  const products = useSelector(selectCartProducts);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer barTitle="Thông tin giỏ hàng của bạn" headTitle="Giỏ Hàng">
      <CartTable />
    </PageContainer>
  );
}

export default CartPage;
