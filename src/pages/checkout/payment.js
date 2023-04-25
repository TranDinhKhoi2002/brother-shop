import { createCipher } from 'crypto';
import Title from '@/common/components/UI/Title';
import BuySteppers from '@/common/components/UI/BuySteppers';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import { selectCurrentUser } from '@/redux/slices/auth';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createOrder } from '@/services/orderRequests';
import { toast } from 'react-toastify';
import CheckoutMethods from '@/modules/payment/components/CheckoutMethods';
import PreviewOrder from '@/modules/payment/components/PreviewOrder';
import CompanyBill from '@/modules/payment/components/CompanyBill';
import PageContainer from '@/common/components/Layout/PageContainer';
import { TRANSPORTATION_COST, paymentMethods } from '@/constants';

function CheckoutPayment() {
  const [loaded, setLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const cartProducts = useSelector(selectCartProducts);
  const currentUser = useSelector(selectCurrentUser);

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
    return acc + currentItem.productId.price * currentItem.quantity;
  }, 0);

  const totalPrice = totalProductsPrice + TRANSPORTATION_COST;

  const payHandler = async () => {
    const { companyName, companyAddress, companyTaxNumber } = ref.current.getInvoiceCompany();

    const formatedCartProducts = cartProducts.map((cartProduct) => ({
      product: cartProduct.productId._id,
      name: cartProduct.productId.name,
      price: cartProduct.productId.price,
      amount: cartProduct.quantity,
      size: cartProduct.size,
      image: `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${cartProduct.productId.images.mainImg}`,
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
      shippingPrice: TRANSPORTATION_COST,
      totalPrice,
      companyName,
      companyAddress,
      companyTaxNumber,
      paymentMethod: paymentMethod === 'cod' ? paymentMethods.COD : paymentMethods.VNPAY,
      customerId: currentUser?._id,
    };

    const { message, orderId } = await createOrder(order);

    const cipher = createCipher('aes-256-cbc', 'secret');
    let encrypted = cipher.update(orderId);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedOrderId = encrypted.toString('base64');
    localStorage.setItem('encryptedOrderId', encryptedOrderId);

    if (paymentMethod === 'cod') {
      toast.success(message);
      router.replace(
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

    router.replace(`http://localhost:3001/payments/vnpay?totalPrice=${totalPrice}`);
  };

  const changePaymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      <BuySteppers activeStep={2} />
      <Container maxWidth="xxl">
        <Title sx={{ ml: { xs: 3, xl: 0 } }}>Phương thức thanh toán</Title>
        <Grid container spacing={3} className="mt-5 mb-10">
          <Grid item xs={12} sm={8}>
            <CheckoutMethods method={paymentMethod} onChangeMethod={changePaymentMethodHandler} />
            <CompanyBill ref={ref} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PreviewOrder
              cartProducts={cartProducts}
              totalPrice={totalPrice}
              shippingPrice={TRANSPORTATION_COST}
              onPay={payHandler}
            />
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

export default CheckoutPayment;
