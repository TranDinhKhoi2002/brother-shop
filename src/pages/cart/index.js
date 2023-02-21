import React from 'react';
import { useSelector } from 'react-redux';

import NavigationLayout from '@/common/components/Layout/NavigationLayout';
// import Order from './Order';
// import DetailCart from './DetailCart';
import Head from 'next/head';
import { selectCartProducts } from '@/redux/slices/cart';
import EmptyCart from '@/modules/cart/components/EmptyCart';
import CartInfor from '@/modules/cart/components/CartInfor';

function CartPage(props) {
  const products = useSelector(selectCartProducts);

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
