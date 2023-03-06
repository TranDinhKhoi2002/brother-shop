import Head from 'next/head';
import { createCipher } from 'crypto';
import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import Title from '@/common/components/UI/Title';
import BuySteppers from '@/common/components/UI/BuySteppers';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import request from '@/services/baseRequest';
import { createOrder } from '@/services/orderRequests';
import { toast } from 'react-toastify';
import CheckoutMethods from '@/modules/payment/components/CheckoutMethods';
import PreviewOrder from '@/modules/payment/components/PreviewOrder';
import CompanyBill from '@/modules/payment/components/CompanyBill';

function CheckoutPayment() {
  const [loaded, setLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const cartProducts = useSelector(selectCartProducts);
  const router = useRouter();
  const ref = useRef();

  const { toName, toPhone, toAddress, toNote, toEmail } = router.query;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  const totalProductsPrice = cartProducts.reduce((acc, currentItem) => {
    return acc + currentItem.product.price * currentItem.amount;
  }, 0);
  const shippingPrice = 25000;
  const totalPrice = totalProductsPrice + shippingPrice;

  const payHandler = async () => {
    const { companyName, companyAddress, companyTaxNumber } = ref.current.getInvoiceCompany();

    const formatedCartProducts = cartProducts.map((cartProduct) => ({
      product: cartProduct.product._id,
      name: cartProduct.product.name,
      price: cartProduct.product.price,
      amount: cartProduct.amount,
      size: cartProduct.size,
      image: `https://res.cloudinary.com/ddajkcbs2/image/upload/${cartProduct.product.images.mainImg}`,
    }));

    const shippingInfor = JSON.parse(localStorage.getItem('shippingInfor'));

    const order = {
      toName: toName || shippingInfor.name,
      toPhone: toPhone || shippingInfor.phone,
      toEmail: toEmail || shippingInfor.email,
      toAddress: toAddress || shippingInfor.address,
      toNote: toNote || shippingInfor.note,
      products: formatedCartProducts,
      totalProductsPrice,
      shippingPrice,
      totalPrice,
      companyName,
      companyAddress,
      companyTaxNumber,
    };

    const { message, orderId } = await createOrder(order);

    const cipher = createCipher('aes-256-cbc', 'secret');
    let encrypted = cipher.update(orderId);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedOrderId = encrypted.toString('base64');
    localStorage.setItem('encryptedOrderId', encryptedOrderId);

    if (paymentMethod === 'cod') {
      toast.success(message);
      router.push(
        {
          pathname: '/checkout/success',
          query: {
            name: toName || shippingInfor.name,
            email: toEmail || shippingInfor.email,
            method: 'cod',
            orderId,
          },
        },
        '/checkout/success',
      );
      return;
    }

    router.push(`http://localhost:3001/payments/vnpay?totalPrice=${totalPrice}`);
    // await request.post('/payments/vnpay', {});
    // router.push('http://localhost:8888/order/create_payment_url');
  };

  const changePaymentMethodHandler = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Đặt Hàng | Brother Shop</title>
      </Head>
      <NavigationLayout title="Đặt hàng">
        <BuySteppers activeStep={3} />
        <div className="mt-5">
          <Title className="ml-4 xl:ml-0">Phương thức thanh toán</Title>
          <Grid container spacing={3} className="px-[5%] xl:px-0 mt-5 mb-10">
            <Grid item xs={12} sm={8}>
              <CheckoutMethods method={paymentMethod} onChangeMethod={changePaymentMethodHandler} />
              <CompanyBill ref={ref} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PreviewOrder
                cartProducts={cartProducts}
                totalPrice={totalPrice}
                shippingPrice={shippingPrice}
                onPay={payHandler}
              />
            </Grid>
          </Grid>
        </div>
      </NavigationLayout>
    </>
  );
}

export default CheckoutPayment;
