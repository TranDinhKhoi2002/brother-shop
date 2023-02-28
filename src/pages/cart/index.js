import { useSelector } from 'react-redux';
import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import Head from 'next/head';
import { selectCartProducts } from '@/redux/slices/cart';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import CartInfor from '@/modules/cart/components/CartInfor';
import { useEffect, useState } from 'react';

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
    <>
      <Head>
        <title>Giỏ Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Thông tin giỏ hàng của bạn">
        {products.length === 0 ? <EmptyCart /> : <CartInfor />}
      </NavigationLayout>
    </>
  );
}

export default CartPage;
