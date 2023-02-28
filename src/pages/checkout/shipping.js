import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import CartInfor from '@/modules/cart/components/CartInfor';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import { selectCartProducts } from '@/redux/slices/cart';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CheckoutShipping() {
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
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">{products.length === 0 ? <EmptyCart /> : <CartInfor />}</NavigationLayout>
    </>
  );
}

export default CheckoutShipping;
